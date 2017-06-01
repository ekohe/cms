Slingshot.fileRestrictions("user-uploads", {
  //Hide for IE
  // allowedFileTypes: ["application/zip",
  //                    "application/pdf", "application/x-pdf", "application/acrobat", "text/pdf", "text/x-pdf",
  //                    "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "pdf"],
  allowedFileTypes: null,
  maxSize: 250 * 1024 * 1024 // 250 MB (use null for unlimited).
});
