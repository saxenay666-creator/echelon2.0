// Offline Storage Utility for ECHELON
// Uses IndexedDB to save problem reports when offline

const DB_NAME = 'EchelonOfflineDB';
const STORE_NAME = 'offlineReports';
const DB_VERSION = 1;

export const initDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    };
  });
};

export const saveOffline = async (reportData) => {
  try {
    const db = await initDB();
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);

    const report = {
      ...reportData,
      timestamp: new Date().toISOString(),
      synced: false
    };

    return new Promise((resolve, reject) => {
      const request = store.add(report);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error('Error saving offline:', error);
    throw error;
  }
};

export const getAllOfflineReports = async () => {
  try {
    const db = await initDB();
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);

    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error('Error getting offline reports:', error);
    return [];
  }
};

export const deleteOfflineReport = async (id) => {
  try {
    const db = await initDB();
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);

    return new Promise((resolve, reject) => {
      const request = store.delete(id);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error('Error deleting offline report:', error);
    throw error;
  }
};

export const isOnline = () => {
  return navigator.onLine;
};

export const syncOfflineReports = async (addProblemFunction) => {
  if (!isOnline()) {
    console.log('Cannot sync: offline');
    return [];
  }

  try {
    const reports = await getAllOfflineReports();
    const synced = [];

    for (const report of reports) {
      if (!report.synced) {
        try {
          await addProblemFunction(report);
          await deleteOfflineReport(report.id);
          synced.push(report);
        } catch (error) {
          console.error('Sync failed for report:', report.id, error);
        }
      }
    }

    return synced;
  } catch (error) {
    console.error('Error syncing offline reports:', error);
    return [];
  }
};

export const clearAllOfflineReports = async () => {
  try {
    const db = await initDB();
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);

    return new Promise((resolve, reject) => {
      const request = store.clear();
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error('Error clearing offline reports:', error);
    throw error;
  }
};
