import CustomRequest from "../utils/customRequest.jsx";

export const EditorConfig = {
  // heightMin: 300,
  width: "100%",
  // imageUpload: true,
      toolbarButtons: {
        moreText: {
            buttons: [
                'bold',
                'italic',
                'underline',
                'strikeThrough',
                'subscript',
                'superscript',
                'fontFamily',
                'fontSize',
                'textColor',
                'backgroundColor',
                'inlineClass',
                'inlineStyle',
                'clearFormatting'
            ]
        },
        moreParagraph: {
            buttons: [
                'alignLeft',
                'alignCenter',
                'formatOLSimple',
                'alignRight',
                'alignJustify',
                'formatOL',
                'formatUL',
                'paragraphFormat',
                'paragraphStyle',
                'lineHeight',
                'outdent',
                'indent',
                'quote'
            ]
        },
        moreRich: {
            buttons: [
                'insertLink',
                'insertImage',
                'insertTable',
                'emoticons',
                'fontAwesome',
                'specialCharacters',
                'embedly',
                'insertHR'
            ]
        },
        moreMisc: {
            buttons: ['undo', 'redo', 'fullscreen', 'print', 'getPDF', 'spellChecker', 'selectAll', 'html', 'help'],
            align: 'right',
            buttonsVisible: 2
        }
    },
  // imageEditButtons: ['imageReplace', 'imageAlign', 'imageCaption', 'imageRemove'],
  // imageInsertButtons: ['imageBack', '|', 'imageUpload',"|","insertImage"],
  imageEditButtons: [
    "imageReplace",
    "imageAlign",
    "imageRemove",
    "imageLink",
    "imageDisplay",
    "imageStyle",
    "imageAlt",
  ],

  //browse Image ImageManager feature laoding link
  imageManagerLoadURL:
    "/api/v1/dashboard/editor/image_manager/get_uploads_files_list",
  //ImageManager's request to delete image
  imageManagerDeleteURL: "/api/v1/dashboard/editor/image/remove_uploaded",

  imageManagerDeleteMethod: "POST",
  // Set the image upload parameter.
  //  imageUploadParam: 'file',

  // Set the image upload URL.
  //  imageUploadURL: '/api/v1/dashboard/editor/image/upload',

  // Additional upload params.
  //  imageUploadParams: {id: 'editor_upload'},

  // Set request type.
  //  imageUploadMethod: 'POST',

  // Set max image size to 5MB.
  imageMaxSize: 5 * 1024 * 1024,

  // Allow to upload PNG and JPG.
  imageAllowedTypes: ["jpeg", "jpg", "png"],
  // toolbarButtons: [
  //   "fullscreen",
  //   "bold",
  //   "italic",
  //   "underline",
  //   "strikeThrough",
  //   "subscript",
  //   "superscript",
  //   "|",
  //   "fontFamily",
  //   "fontSize",
  //   "color",
  //   "inlineStyle",
  //   "paragraphStyle",
  //   "|",
  //   "paragraphFormat",
  //   "align",
  //   "formatOL",
  //   "formatUL",
  //   "outdent",
  //   "indent",
  //   "quote",
  //   "-",
  //   "insertLink",
  //   "insertImage",
  //   "insertTable",
  //   "|",
  //   "emoticons",
  //   "specialCharacters",
  //   "insertHR",
  //   "selectAll",
  //   "clearFormatting",
  //   "|",
  //   "print",
  //   "help",
  //   "html",
  //   "|",
  //   "undo",
  //   "redo",
  //   "trackChanges",
  //   "markdown",
  // ],

  toolbarSticky: false,
  useClasses: false,
  events: {
    "image.beforeUpload": function (images) {
      const editor = this;
      // Before image is uploaded
      const data = new FormData();
      data.append("file", images[0]);

      const headers = {
        "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        "Content-Type": "application/json",
      };
     CustomRequest.post("/dashboard/editor/image/upload", data, headers)
        .then((res) => {
          // console.log(res);
          editor.image.insert(res.data.link, null, null, editor.image.get());
          return false;
        })
        .catch((err) => {
          console.log(err)
          toast.error("Oops! Error while uploading image in Editor");

        });
      return false;
    },
    "image.removed": async function ($img) {
      let data = {
        src: $img.attr("src"),
      };
      await CustomRequest.post(
        "/dashboard/editor/image/remove_uploaded",
        data,
        { "Content-Type": "application/json" }
      )
        .then((res) => {
          if (res.status == 200) {
            return true;
          }
        })
        .catch((err) => {
          toast.error("Oops! Error while uploading image in Editor");
        });
      return false;
    },
    "imageManager.beforeDeleteImage": function ($img) {
      const editor = this;
      let data = {
        src: $img.attr("src"),
      };
      CustomRequest.post("/dashboard/editor/image/remove_uploaded", data, {
        "Content-Type": "application/json",
      })
        .then((res) => {
          if (res.status == 200) {
            const imageElement = document.querySelector(
              `img[src="${$img.attr("src")}"]`
            );
            if (imageElement) {
              const imageContainer = imageElement.closest(
                ".fr-image-container"
              );
              if (imageContainer) {
                imageContainer.remove();
              }
            }
            toast.success("image Deleted Successfully");
            return false;
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Oops! Error while deleting image in Editor");
        });
      return false;
    },
    "image.error": function (error, response) {
      // Bad link.
      if (error.code == 1) {
        toast.error("Error: Bad Image link.");
      }

      // No link in upload response.
      else if (error.code == 2) {
        toast.error("Error: No link in upload response..");
      }

      // Error during image upload.
      else if (error.code == 3) {
        toast.error("Error: Error during image upload.");
      }

      // Parsing response failed.
      else if (error.code == 4) {
        toast.error("Error: Parsing response failed.");
      }

      // Image too text-large.
      else if (error.code == 5) {
        toast.error("Error: Image too text-large.");
      }

      // Invalid image type.
      else if (error.code == 6) {
        toast.error("Error: Invalid image type.");
      }

      // Image can be uploaded only to same domain in IE 8 and IE 9.
      else if (error.code == 7) {
        toast.error(
          "Error: Image can be uploaded only to same domain in IE 8 and IE 9.."
        );
      }

      // Response contains the original server response to the request if available.
    },
  },
};
