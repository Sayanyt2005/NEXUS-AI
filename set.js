




const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic09VMzE2dU9rZGNCSk05eWY3OTNaS0U3eEV4QTJLdTBpcXE2ZHArUW1FQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOHYrMFZhL2d2T2ErdEpVRWQ3YVZsWmNVdVlGMTVYNmhuZzlIKzZQeTMxRT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFTUpBY2hSMng5ZUgzY1l0Y3ZXVjZrRUJWc1NObW5mY2ZhMmVhOGNad2xjPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJQTVkSmdHdXl6ZWN5ejZsd2RYVGRrbWNaNm5DbW9HMDhFN0QxbExCckhvPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IitBRmRxQ2lOK2tQTng1UmQ1VjRuTVplOStMT0pjUFQ5eVgzcXc3cVZKbDg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjE0TEFHNno0Tk1LNzJ6NnJsQU5iMGtXUmFNQis3bjd0bDBZdTkrUlRFU2s9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMENyVlN4UDVjeUorcCtweExRTmtmcnA0amptZDNrOEtUS3AwSmh0RkFYYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmlEbDdQK2NJS0UzWjlSOUx2WE9HMXk2akthQUFvdWxaQmxUZU04T3FuUT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Illlb3ZqbmoyTlRzUlZyclk1WHpQTTd6ZERDeGRwbE1CZHcvZUszTnF6RDBOaE1jYk5nZVF2QVJvWGJjZHh1ZGhNMG1KMG15RjhDT0JUTmFodFFETkRBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTUyLCJhZHZTZWNyZXRLZXkiOiJZRFhicUZub2tXNDZPQ3hJdzZERUN0d3FoazhnVEZ5YlJpdmtWdU9jbk5NPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjkxOTg4MzU2NTU2M0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI1NDFBODdFQjBEOTY2RTk2OTNEMjY0QTU4Njg0ODk0MyJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ5NzIyMTc5fSx7ImtleSI6eyJyZW1vdGVKaWQiOiI5MTk4ODM1NjU1NjNAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiREZFMjc4NDIzRTI4NDcwNTFDRUYzQkEzN0Y1NzI2MDQifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0OTcyMjE4MH0seyJrZXkiOnsicmVtb3RlSmlkIjoiOTE5ODgzNTY1NTYzQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjRDQzg1QTc0NzMyRjU5MDE0QTRCRDZEQUVDQUQyQTM2In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDk3MjIyMDR9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6IjYxM0RKUzVGIiwibWUiOnsiaWQiOiI5MTk4ODM1NjU1NjM6NkBzLndoYXRzYXBwLm5ldCIsImxpZCI6IjI0OTgxNzI1OTMxNTI0MTo2QGxpZCIsIm5hbWUiOiLwnZmP8J2Zp/CdmZ7wnZmo8J2ZnfCdmZYg4p2k4oCN8J+puSJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSmk1NmFBREVMUElxc0lHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoidVdWUk5Ya21idEd1bzhqNSsyWmg3TDB2d2NBcmJJTUlzNHJteE1rUk9uQT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiNGc3Tnc5NTg4bGwwVXoxWmY5WmhISmk4RXBMbEV1Tk13RmpOcTIyMC9aZGtrR1pTRHhoYy9yakIrTGsreERsVkEvbXliQkFmbGF2dEUzUjlBc0FpRFE9PSIsImRldmljZVNpZ25hdHVyZSI6Ik1kQ1gvZFRDblhRbGNlK3NBMWlacFB0dmFYNERMVUs0K2JlemtaZHRwQkpMc2pmbnFGK0FKaVJjOXgxNXJMY2o2MTRMVURxaUZUc0YzNkljN2wrL0RBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTE5ODgzNTY1NTYzOjZAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCYmxsVVRWNUptN1JycVBJK2Z0bVlleTlMOEhBSzJ5RENMT0s1c1RKRVRwdyJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FJSUJRPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQ5NzIyMTc2LCJsYXN0UHJvcEhhc2giOiI0WlJQNlMiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUhiUyJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "919883565563",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " Ibrahim Adams",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTICALL : process.env.ANTICALL || 'no',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'yes',
                  CHATBOT : process.env.CHATBOT || "yes",
                  AUTO_BIO : process.env.AUTO_BIO || "yes",
                  AUTO_REACT : process.env.AUTO_REACT || "no",
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
