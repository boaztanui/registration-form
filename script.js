function showSection(sectionId, isNext) {
  // Validate current section inputs before proceeding
  if (isNext) {
    var currentSectionId = sectionId - 1;
    var currentSection = document.getElementById("section" + currentSectionId);
    if (!validateSection(currentSection)) {
      alert(
        "Please fill all required fields and ensure email and phone number are valid."
      );
      return; // Stop the function if validation fails
    }
  }

  // Hide all sections
  var sections = document.querySelectorAll(".form");
  sections.forEach(function (section) {
    section.style.display = "none";
  });

  // Show the specified section
  var showSection = document.getElementById("section" + sectionId);
  showSection.style.display = "block";
}

function validateSection(section) {
  var inputs = section.querySelectorAll(
    "input[required], textarea[required], select[required]"
  );
  var isValid = true;
  inputs.forEach((input) => {
    if (!input.value) {
      isValid = false; // Check if the input is empty
    } else if (input.type === "email" && !isValidEmail(input.value)) {
      isValid = false; // Validate email
    } else if (input.type === "tel" && !isValidPhoneNumber(input.value)) {
      isValid = false; // Validate phone number
    }
  });
  return isValid;
}

function onChangePhoto() {
  let files = event.target.files;
  var file_name = photo.value.split(".")[1];
  if (file_name != "png" || file_name != "jpg") {
    photoerror1.style.display = "none";
    if (files.length) {
      var show_photo = document.getElementById("show_photo");
      show_photo.src = URL.createObjectURL(files[0]);
      show_photo.style.display = "block";
    }
  } else {
    document.getElementById("photo").value = null;
    document.getElementById("show_photo").style.display = "none";
    photoerror1.style.display = "block";
    //show_photo.style.display = "none";
  }
}

document
  .getElementById("emailForm")
  .addEventListener("submit", function (event) {
    var email = document.getElementById("emailInput").value;
    if (!isValidEmail(email)) {
      alert("Please enter a valid email address.");
      event.preventDefault(); // Prevent form submission
    }
  });

function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return emailRegex.test(email);
}

function isValidPhoneNumber(phoneNumber) {
  const phoneRegex =
    /^(\+\d{1,2}\s?)?(\(\d{3}\)|\d{3})[-.\s]?\d{3}[-.\s]?\d{4}$/;
  return phoneRegex.test(phoneNumber);
}

function toggleIDInput() {
  var selection = document.getElementById("hasNationalID").value;
  var nationalIDSection = document.getElementById("nationalIDSection");
  var birthCertificateSection = document.getElementById(
    "birthCertificateSection"
  );

  // Hide both sections initially
  nationalIDSection.style.display = "none";
  birthCertificateSection.style.display = "none";

  // Toggle visibility based on user selection
  if (selection === "yes") {
    nationalIDSection.style.display = "flex";
  } else if (selection === "no") {
    birthCertificateSection.style.display = "flex";
  }
}

///// this can also be performed easily when the form is pushed to a database then you can just extract data as pdf after submit
async function generatePDF() {
  const { jsPDF } = window.jspdf;
  const form = document.getElementById("identityForm");
  const pdf = new jsPDF();

  html2canvas(form).then((canvas) => {
    // Convert form to canvas and then to an image for inclusion in the PDF
    const imageData = canvas.toDataURL("image/png");
    pdf.addImage(imageData, "PNG", 10, 10, 180, 160);

    // Handling file inputs (assuming they are images or converted to images for simplicity)
    // In practice, handling PDF files within another PDF would require extracting images or pages which jsPDF does not support natively
    // This example assumes image files for demonstration or that you have previously converted PDF pages to images
    handleFileInput(pdf, "nationalIDFile", function () {
      handleFileInput(pdf, "birthCertificateFile", function () {
        pdf.save("download.pdf");
      });
    });
  });
}
// generate PDF after submit
async function generatePDF() {
  const formElement = document.getElementById("multiPartForm");
  const canvas = await html2canvas(formElement);
  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF();
  pdf.addImage(imgData, "PNG", 10, 10);
  pdf.save("formDetails.pdf");
}

document
  .querySelectorAll(".form-section input, .form-section select")
  .forEach((input) => {
    input.addEventListener("change", () => {
      // Code to handle changes and validate in real-time, if needed
    });
  });
