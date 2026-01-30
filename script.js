const countInput = document.getElementById("count");
const container = document.getElementById("participants");
const form = document.getElementById("regForm");
const submitBtn = document.getElementById("submitBtn");

// 1. Dynamic UI Generation
// This creates the rounded-edge cards where name and dropdowns share a row
countInput.addEventListener("input", () => {
  const n = parseInt(countInput.value);
  container.innerHTML = "";

  if (!n || n < 1) return;

  for (let i = 1; i <= n; i++) {
    container.innerHTML += `
      <div class="participant-card">
        <h4>Participant ${i}</h4>
        <div class="input-row">
          <input name="name_${i}" placeholder="Full Name" required>
          
          <select name="gender_${i}" required>
            <option value="">Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
          
          <select name="hostel_${i}" required>
            <option value="">Hostel</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
      </div>
    `;
  }
});

// 2. Form Submission Logic
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Show loading state on the button
  const originalBtnText = submitBtn.innerText;
  submitBtn.disabled = true;
  submitBtn.innerText = "SUBMITTING...";

  const college = form.college.value;
  const n = parseInt(countInput.value);
  const participants = [];

  // Collect participant data
  for (let i = 1; i <= n; i++) {
    participants.push({
      name: form[`name_${i}`].value,
      gender: form[`gender_${i}`].value,
      hostel: form[`hostel_${i}`].value
    });
  }

  // Use URLSearchParams to avoid CORS 'Preflight' (OPTIONS) blocks
  const formData = new URLSearchParams();
  formData.append("college", college);
  formData.append("participants", JSON.stringify(participants));

  try {
    // IMPORTANT: Ensure this matches your LATEST Google Apps Script Deployment URL
    const scriptURL = "https://script.google.com/macros/s/AKfycbxkWaO0YgYy7AbLUuuinqZ2jFRb7G4jq7iCE1z0UFYqFxjnawCyFH8i9G4mZpGPmJYakw/exec";

    await fetch(scriptURL, {
      method: "POST",
      mode: "no-cors", // Required for Google Apps Script
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString()
    });

    // Success Handling
    alert("Registration for " + college + " has been recorded!");
    
    // Clear the form
    form.reset();
    container.innerHTML = "";
    
  } catch (error) {
    console.error("Submission Error:", error);
    alert("An error occurred. Please check your connection and try again.");
  } finally {
    // Restore button state
    submitBtn.disabled = false;
    submitBtn.innerText = originalBtnText;
  }
});
