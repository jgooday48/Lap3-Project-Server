// const mongoose = require("mongoose")
// const domPurifier = require('dompurify')
// const { JSDOM } = require('jsdom')
// const htmlPurify = domPurifier(new JSDOM().window)
// // const stripHtml = require('string-strip-html')

// const NotesSchema = new mongoose.Schema({
//     Title: {
//         type: String,
//     },
//     Content: {
//         type: String
//     }
//     // Content: {
//     //     type: String,
//     //     set: function (value) {
//     //         // Use stripHtml to remove HTML tags from content
//     //         const strippedText = stripHtml(value).result;

//     //         // // Use cheerio to parse HTML and extract image sources
//     //         // const $ = cheerio.load(value);
//     //         // const imageSources = [];
//     //         // $('img').each((index, element) => {
//     //         //     const src = $(element).attr('src');
//     //         //     imageSources.push(src);
//     //         // });

//     //         // Store both stripped text and image sources in Content
//     //         return {
//     //             text: strippedText
//     //             // ,images: imageSources,
//     //         };
//     //     }
//     // },
//     ,
//     IsImportant: {
//         type: Boolean,
//     },
//     Section: {
//         type: mongoose.Schema.Types.ObjectId, ref: 'Folders'
//     },
//     Snippet: {
//         type: String
//     },
//     User: {
//         type: mongoose.Schema.Types.ObjectId, ref: 'User'

//     },

//     DateTime: {
//         type: Date, default:  Date.now
//     }


    
// }, { timestamps: true });
  

  
//   module.exports = mongoose.model("Notes", NotesSchema); //make data schema


const mongoose = require("mongoose");
const domPurifier = require('dompurify');
const { JSDOM } = require('jsdom');
const htmlPurify = domPurifier(new JSDOM().window);
// const stripHtml = require('string-strip-html');

// Define the Notes schema
const NotesSchema = new mongoose.Schema({
    Title: {
        type: String,
    },
    Content: {
        type: String
    },
    IsImportant: {
        type: Boolean,
        default: false
    },
    Section: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Folders'
    },
    User: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }
}, { timestamps: true });

// Create the Notes model and export it
const NotesModel = mongoose.model("Notes", NotesSchema);
module.exports = NotesModel;
