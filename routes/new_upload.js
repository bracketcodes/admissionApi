// const fs = require("fs");
// const csv = require("fast-csv");


// const multer = require("multer");

// const csvFilter = (req, file, cb) => {
//   if (file.mimetype.includes("csv")) {
//     cb(null, true);
//   } else {
//     cb("Please upload only csv file.", false);
//   }
// };

// var storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, __basedir + "/resources/static/assets/uploads/");
//   },
//   filename: (req, file, cb) => {
//     console.log(file.originalname);
//     cb(null, `${Date.now()}-bezkoder-${file.originalname}`);
//   },
// });

// var uploadFile = multer({ storage: storage, fileFilter: csvFilter });


// const upload = async (req, res) => {
//   try {
//     if (req.file == undefined) {
//       return res.status(400).send("Please upload a CSV file!");
//     }

//     let tutorials = [];
//     let path = __basedir + "/resources/static/assets/uploads/" + req.file.filename;

//     fs.createReadStream(path)
//       .pipe(csv.parse({ headers: true }))
//       .on("error", (error) => {
//         throw error.message;
//       })
//       .on("data", (row) => {
//         tutorials.push(row);
//       })
//       .on("end", () => {
//         Tutorial.bulkCreate(tutorials)
//           .then(() => {
//             res.status(200).send({
//               message:
//                 "Uploaded the file successfully: " + req.file.originalname,
//             });
//           })
//           .catch((error) => {
//             res.status(500).send({
//               message: "Fail to import data into database!",
//               error: error.message,
//             });
//           });
//       });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       message: "Could not upload the file: " + req.file.originalname,
//     });
//   }
// };

// module.exports = {
//     upload,
//     uploadFile
//   };