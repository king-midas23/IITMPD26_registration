const countInput = document.getElementById("count");
const container = document.getElementById("participants");
const form = document.getElementById("regForm");

// Dynamically generate participant fields
countInput.addEventListener("input", () => {
  const n = parseInt(countInput.value);
  container.innerHTML = "";

  if (!n || n < 1) return;

  for (let i = 1; i <= n; i++) {
    container.innerHTML += `
      <div class="participant-block">
        <h4>Participant ${i}</h4>
        <input name="name_${i}" placeholder="Name" required>
        <select name="gender_${i}" required>
          <option value="">Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <select name="hostel_${i}" required>
          <option value="">Hostel</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        <br><br>
      </div>
    `;
  }
});

// Handle Form Submission
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const college = form.college.value;
  const n = parseInt(countInput.value);
  const participants = [];

  // Collect data from dynamic fields
  for (let i = 1; i <= n; i++) {
    participants.push({
      name: form[`name_${i}`].value,
      gender: form[`gender_${i}`].value,
      hostel: form[`hostel_${i}`].value
    });
  }

  // Use URLSearchParams to bypass CORS preflight issues
  const formData = new URLSearchParams();
  formData.append("college", college);
  formData.append("participants", JSON.stringify(participants));

  try {
    // Sending the request
    await fetch("https://script.google.com/macros/s/AKfycbydRYF7t-pwckXfRTG4IsYYwRYfdKr0SPOsbtibfNBzw9E4u8GaQ4hrdSkId_j7GAdBtA/exec", {
      method: "POST",
      mode: "no-cors", // Essential for Google Apps Script
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString()
    });

    // Note: With no-cors, we can't read the response, so we assume success if no error is thrown
    alert("Registration submitted successfully!");
    
    // Reset form and UI
    form.reset();
    container.innerHTML = "";
    
  } catch (error) {
    console.error("Submission Error:", error);
    alert("There was an error submitting the form. Please try again.");
  }
});
