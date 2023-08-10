import connection from "./connection";
import { Expediteur } from "./models/expediteur";
import bcrypt from "bcrypt";
import { StatutCourrier } from "./models/statutCourrier";
import { Statut } from "./models/statut";
import { Courrier } from "./models/courrier";

const etats = [
  {
    etat: "en attente",
    statutCode: 1,
  },
  {
    etat: "pris en charge",
    statutCode: 2,
  },
  {
    etat: "avisé",
    statutCode: 3,
  },
  {
    etat: "mis en instance",
    statutCode: 4,
  },
  {
    etat: "distribué",
    statutCode: 5,
  },
  {
    etat: "NPAI",
    statutCode: 6,
  },
  {
    etat: "non réclamé",
    statutCode: 7,
  },
  {
    etat: "erreur de libellé",
    statutCode: 8,
  },
];

const firstnames = [
  "Oliver",
  "Sophia",
  "Ethan",
  "Emma",
  "Aiden",
  "Isabella",
  "Jackson",
  "Mia",
  "Lucas",
  "Charlotte",
  "Liam",
  "Amelia",
  "Noah",
  "Harper",
  "Mason",
];

const lastnames = [
  "Pinson",
  "Smith",
  "Johnson",
  "Brown",
  "Garcia",
  "Miller",
  "Davis",
  "Rodriguez",
  "Martinez",
  "Hernandez",
  "Lopez",
  "Gonzalez",
  "Perez",
  "Taylor",
  "Anderson",
  "Wilson",
  "Jackson",
  "Moore",
  "Lee",
  "Thompson",
  "White",
  "Harris",
  "Clark",
  "Lewis",
  "Robinson",
  "Walker",
  "Parker",
  "Hall",
  "Young",
  "Allen",
  "King",
  "Wright",
  "Scott",
  "Green",
  "Baker",
  "Adams",
  "Nelson",
  "Carter",
  "Mitchell",
  "Perez",
  "Roberts",
  "Turner",
  "Phillips",
  "Campbell",
  "Parker",
  "Evans",
  "Edwards",
  "Collins",
  "Stewart",
  "Sanchez",
];

const cities: Array<{ name: string; postcode: string }> = [
  { name: "New York City", postcode: "10001" },
  { name: "Los Angeles", postcode: "90001" },
  { name: "Chicago", postcode: "60601" },
  { name: "Houston", postcode: "77001" },
  { name: "Phoenix", postcode: "85001" },
  { name: "Philadelphia", postcode: "19101" },
  { name: "San Antonio", postcode: "78201" },
  { name: "San Diego", postcode: "92101" },
  { name: "Dallas", postcode: "75201" },
  { name: "Gelos", postcode: "64101" },
];

const domains = [
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "aol.com",
  "outlook.com",
  "icloud.com",
  "mail.com",
  "protonmail.com",
  "zoho.com",
  "gmx.com",
];

const addresses = [
  "123 Main St",
  "456 Elm St",
  "789 Oak Ave",
  "1011 Pine Dr",
  "1213 Maple Ct",
  "1415 Birch Rd",
  "1617 Cedar Ln",
  "1819 Walnut Way",
  "2021 Spruce Ave",
  "2223 Chestnut St",
  "2425 Ash Blvd",
  "2627 Poplar Lane",
  "2829 Dogwood Dr",
  "3031 Magnolia Ave",
  "3233 Rosewood St",
  "3435 Laurel Rd",
  "3637 Sycamore Blvd",
  "3839 Hickory Ct",
  "4041 Cypress Lane",
  "4243 Cedar St",
  "4445 Maple Ave",
  "4647 Oak Ct",
  "4849 Elm Rd",
  "5051 Birch Blvd",
  "5253 Pine Ave",
  "5455 Walnut St",
  "5657 Spruce Way",
  "5859 Chestnut Ave",
  "6061 Ash Rd",
  "6263 Poplar Ct",
  "6465 Dogwood Blvd",
  "6667 Magnolia Lane",
  "6869 Rosewood Dr",
  "7071 Laurel Ave",
  "7273 Sycamore St",
  "7475 Hickory Way",
  "7677 Cypress Dr",
  "7879 Cedar Rd",
  "8081 Maple Ct",
  "8283 Oak Lane",
  "8485 Elm Blvd",
  "8687 Birch Ave",
  "8889 Pine Rd",
  "9091 Walnut St",
  "9293 Spruce Blvd",
  "9495 Chestnut Ct",
  "9697 Ash Ave",
  "9899 Poplar Rd",
  "1010 Main St",
  "666 Pinson Xavier St",
];

const fakePhoneNumbers: string[] = [
  "(201) 555-0123",
  "(202) 555-0190",
  "(203) 555-0167",
  "(204) 555-0137",
  "(205) 555-0185",
  "(206) 555-0155",
  "(207) 555-0171",
  "(208) 555-0140",
  "(209) 555-0119",
  "(210) 555-0187",
  "(211) 555-0158",
  "(212) 555-0174",
  "(213) 555-0143",
  "(214) 555-0112",
  "(215) 555-0192",
  "(216) 555-0163",
  "(217) 555-0132",
  "(218) 555-0101",
  "(219) 555-0189",
  "(220) 555-0150",
];

function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function createUsers() {
  const users = Array<any>();

  for (let i = 0; i < 50; i++) {
    const lastname = lastnames[i];
    const firstname = firstnames[getRandomNumber(0, 14)];
    const email = `${firstname}.${lastname}@${domains[getRandomNumber(0, 9)]}`;
    const address = addresses[i];
    const password = "";
    const roles = ["expediteur"];
    const tmp: any = cities[getRandomNumber(0, 9)];
    const city = tmp.name;
    const postcode = tmp.postcode;
    const phoneNumber = fakePhoneNumbers[getRandomNumber(0, 19)];

    const user: any = {
      nom: lastname,
      prenom: firstname,
      adresse: address,
      email,
      password,
      roles,
      ville: city,
      codePostal: postcode,
      telephone: phoneNumber,
    };

    // Lowercase all string fields of the user object
    Object.keys(user).forEach((key) => {
      if (typeof user[key] === "string") {
        user[key] = user[key].toLowerCase();
      }
    });

    users.push(user);
  }

  for (const item of users) {
    item.password = await bcrypt.hash("Toto@1234", 10);
  }

  connection.addModels([Expediteur]);
  await Expediteur.bulkCreate(users);
}

async function createStatuts() {
  await Statut.bulkCreate(etats);
}

async function createCourriers(
  max: number,
  minS: number,
  maxS: number,
  courrierId: number,
  bordereau: number
) {
  const courriers = Array<any>();
  const statutCourrier = Array<any>();

  const users = await Expediteur.findAll({ raw: true });

  for (const user of users) {
    for (let i = 0; i < max; i++) {
      const type = getRandomNumber(0, 2);
      const numBrdereau = bordereau;
      const lastname = lastnames[getRandomNumber(0, 49)];
      const firstname = firstnames[getRandomNumber(0, 14)];
      const address = addresses[getRandomNumber(0, 49)];
      const tmp: any = cities[getRandomNumber(0, 9)];
      const city = tmp.name;
      const postcode = tmp.postcode;
      const phoneNumber = fakePhoneNumbers[getRandomNumber(0, 19)];
      const expediteur_id = user.id;

      const courrier: any = {
        nom: lastname.toLocaleLowerCase(),
        prenom: firstname.toLocaleLowerCase(),
        adresse: address.toLocaleLowerCase(),
        ville: city.toLocaleLowerCase(),
        codePostal: postcode.toLocaleLowerCase(),
        telephone: phoneNumber,
        type: type,
        bordereau: numBrdereau,
        expediteur_id,
      };
      console.log("courrier:", courrier);

      bordereau++;
      for (let j = minS; j < maxS; j++) {
        const statut = {
          date: new Date(),
          courrier_id: courrierId + i + 1,
          statut_id: j,
        };
        statutCourrier.push(statut);
      }
      courriers.push(courrier);
    }
  }
  await Courrier.bulkCreate(courriers);
  await StatutCourrier.bulkCreate(statutCourrier);
}

async function loadFixtures() {
  await createUsers();
  await createStatuts();
  await createCourriers(15, 1, 5, 1, 1);
  await createCourriers(100, 1, 6, 750, 751);
}

loadFixtures();
