import { db } from "@/firebaseConfig";
import { FuelStatistic } from "@/utils/types";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, updateDoc } from "firebase/firestore";

/**
 * Adds a fuel statistic to the Firestore database for a specific user.
 * @param uid - The Firebase Authentication UID of the user.
 * @param fuelStatistic - The fuel statistic data to save.
 */
export const addFuelStatistic = async (fuelStatistic: FuelStatistic, uid?: string) => {
    if (!uid) {
        throw new Error("User ID is required to add a fuel statistic.");
    }
    
    try {
        await addDoc(
            collection(db, `users/${uid}/fuelStatistics`),
            fuelStatistic
        )
    } catch (e) {
        throw e; // Re-throw the error for handling in the component
    }
};

/**
 * Fetches all fuel statistics for a specific user.
 * @param uid - The Firebase Authentication UID of the user.
 * @returns A list of fuel statistics.
 */
export const getFuelStatistics = async (uid?: string) => {
    if (!uid) {
        throw new Error("User ID is required to fetch fuel statistics.");
    }

    try {
        const querySnapshot = await getDocs(query(collection(db, `users/${uid}/fuelStatistics`), orderBy("date", "asc")))
        return querySnapshot.docs.map((doc) => ({
            id: doc.id, // Include the document ID if needed
            ...doc.data(),
        })) as FuelStatistic[];
         
    } catch (e) {
        console.error("Error fetching fuel statistics:", e);
        throw e; // Re-throw the error for handling in the component
    }
};

/**
 * Fetches a specific fuel statistic by its ID for a specific user.
 * @param uid - The Firebase Authentication UID of the user.
 * @param fuelStatisticId - The ID of the fuel statistic to fetch.
 * @returns The fuel statistic data or null if not found.
 */
export const getFuelStatisticByIdAndPersonUid = async (fuelStatisticId: string, uid?: string) => {
    if (!uid) {
        throw new Error("User ID is required to fetch a fuel statistic.");
    }

    try {
        const docRef = doc(collection(db, `users/${uid}/fuelStatistics`), fuelStatisticId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as FuelStatistic;
        } else {
            return null; // Document does not exist
        }
    } catch (e) {
        console.error("Error fetching fuel statistic by ID:", e);
        throw e; // Re-throw the error for handling in the component
    }
};

/**
 * Modifies an existing fuel statistic in the Firestore database for a specific user.
 * @param fuelStatistic - The updated fuel statistic data.
 * @param uid - The Firebase Authentication UID of the user.
 */
export const editFuelStatistic = async (
    fuelStatistic: FuelStatistic,
    uid?: string
) => {
    if (!uid) {
        throw new Error("User ID is required to modify a fuel statistic.");
    }

    try {
        const docRef = doc(db, `users/${uid}/fuelStatistics/${fuelStatistic.id}`);
        await updateDoc(docRef, {
            date: fuelStatistic.date,
            fuelAmount: fuelStatistic.fuelAmount,
            kilometres: fuelStatistic.kilometres,
            price: fuelStatistic.price,
            place: fuelStatistic.place,
        });
    } catch (e) {
        throw e; // Re-throw the error for handling in the component
    }
};

/**
 * Deletes a specific fuel statistic by its ID for a specific user.
 * @param fuelStatisticId - The ID of the fuel statistic to delete.
 * @param uid - The Firebase Authentication UID of the user.
 */
export const deleteFuelStatistic = async (fuelStatisticId: string, uid?: string) => {
    if (!uid) {
        throw new Error("User ID is required to delete a fuel statistic.");
    }

    try {
        const docRef = doc(db, `users/${uid}/fuelStatistics/${fuelStatisticId}`);
        await deleteDoc(docRef);
    } catch (e) {
        console.error("Error deleting fuel statistic:", e);
        throw e; // Re-throw the error for handling in the component
    }
};