import { createDatabase } from "./db";

export async function seeding(
  italianWords: any,
  frenchWords: any,
  germanWords: any,
  spanishWords: any,
  urkainianWords: any,
  usersData: any
): Promise<void> {
  try {
    const db = await createDatabase();

    const ukrainianCollection = db.collection("ukrainian");
    const frenchCollection = db.collection("french");
    const germanCollection = db.collection("german");
    const italianCollection = db.collection("italian");
    const spanishCollection = db.collection("spanish");
    const users = db.collection("users");

    const deleteUkrainain = await ukrainianCollection.deleteMany({});
    const deleteFrench = await frenchCollection.deleteMany({});
    const deleteGerman = await germanCollection.deleteMany({});
    const deleteItalian = await italianCollection.deleteMany({});
    const deleteSpanish = await spanishCollection.deleteMany({});
    const deleteUsers = await users.deleteMany({});

    await ukrainianCollection.insertMany(urkainianWords);
    await frenchCollection.insertMany(frenchWords);
    await germanCollection.insertMany(germanWords);
    await italianCollection.insertMany(italianWords);
    await spanishCollection.insertMany(spanishWords);
    await users.insertMany(usersData);
  } catch (err) {
    console.log(err);
  }
}
