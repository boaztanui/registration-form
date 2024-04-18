document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registrationForm");
  const submitButton = document.getElementById("submitButton");

  // Validate photo upload
  document.getElementById("photo").addEventListener("change", function (event) {
    var file = event.target.files[0];
    var fileSize = file.size / 1024 / 1024; // size in MB
    var regex = /\.(jpg|jpeg|png)$/i;

    if (!regex.test(file.name) || fileSize > 2) {
      document.getElementById("photoerror1").style.display = "block";
      document.getElementById("show_photo").style.display = "none";
    } else {
      document.getElementById("photoerror1").style.display = "none";
      var reader = new FileReader();
      reader.onload = function (e) {
        document.getElementById("show_photo").src = e.target.result;
        document.getElementById("show_photo").style.display = "block";
      };
      reader.readAsDataURL(file);
    }
  });

  // Validate certificate upload (PDF files)
  document.querySelectorAll('input[type="file"]').forEach((input) => {
    input.addEventListener("change", function (event) {
      if (input.accept.includes("pdf")) {
        var file = event.target.files[0];
        if (!/\.(pdf)$/i.test(file.name)) {
          alert("Only PDF files are allowed for certificates.");
        }
      }
    });
  });

  // Toggle ID and Birth Certificate input fields

  /*
  document
    .getElementById("hasNationalID")
    .addEventListener("change", function () {
      var hasID = this.value;
      document.getElementById("nationalIDSection").style.display =
        hasID === "yes" ? "flex" : "none";
      document.getElementById("birthCertificateSection").style.display =
        hasID === "no" ? "flex" : "none";
    });

    */

  // Form submission validation
  form.addEventListener("submit", function (event) {
    if (
      !this.checkValidity() ||
      !document.getElementById("agreeTerms").checked
    ) {
      event.preventDefault(); // Stop form from submitting
      alert(
        "Please fill all required fields, ensure all uploads are valid, and agree to the terms and conditions."
      );
      return false;
    }
    // Further processing or PDF generation goes here
  });
});
// Function to toggle the visibility of National ID and Birth Certificate input fields
function toggleIDInput() {
  var hasNationalID = document.getElementById("hasNationalID").value;

  // Access the National ID input fields
  var nationalIDNumberDiv =
    document.getElementById("nationalIDNumber").parentNode;
  var nationalIDFileDiv = document.getElementById("nationalIDFile").parentNode;

  // Access the Birth Certificate input fields
  var birthCertificateNumberDiv = document.getElementById(
    "birthCertificateNumber"
  ).parentNode;
  var birthCertificateFileDiv = document.getElementById(
    "birthCertificateFile"
  ).parentNode;
  var birthCertificateFileLabel = document.querySelector(
    'label[for="birthCertificateFile"]'
  );

  if (hasNationalID === "no") {
    // Hide National ID fields
    nationalIDNumberDiv.style.display = "none";
    nationalIDFileDiv.style.display = "none";

    // Show Birth Certificate fields
    birthCertificateNumberDiv.style.display = "flex"; // Changed to 'flex' as it is a flex item
    birthCertificateFileDiv.style.display = "flex"; // Changed to 'flex' as it is a flex item
    birthCertificateFileLabel.style.display = "flex"; // Show label for birth certificate file
  } else if (hasNationalID === "yes") {
    // Show National ID fields
    nationalIDNumberDiv.style.display = "flex"; // Changed to 'flex' as it is a flex item
    nationalIDFileDiv.style.display = "flex"; // Changed to 'flex' as it is a flex item

    // Hide Birth Certificate fields
    birthCertificateNumberDiv.style.display = "none";
    birthCertificateFileDiv.style.display = "none";
    birthCertificateFileLabel.style.display = "none"; // Hide label for birth certificate file
  } else {
    // Show National ID fields by default when no option is selected
    nationalIDNumberDiv.style.display = "flex"; // Changed to 'flex' as it is a flex item
    nationalIDFileDiv.style.display = "flex"; // Changed to 'flex' as it is a flex item

    // Hide Birth Certificate fields
    birthCertificateNumberDiv.style.display = "none";
    birthCertificateFileDiv.style.display = "none";
    birthCertificateFileLabel.style.display = "none"; // Hide label for birth certificate file
  }
}
