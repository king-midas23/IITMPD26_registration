const countInput = document.getElementById("count");
const container = document.getElementById("participants");
const form = document.getElementById("regForm");
const submitBtn = form.querySelector('button[type="submit"]');

// Dynamically generate participant fields with card styling
countInput.addEventListener("input", () => {
  const n = parseInt(countInput.value);
  container.innerHTML = "";

  if (!n || n < 1) return;

  for (let i = 1; i <= n; i++) {
    container.innerHTML += `
      <div class="participant-card">
        <h4>Participant ${i}</h4>
        <div class="form-group">
          <input name="name_${i}" placeholder="Full Name" required>
        </div>
        <div class="form-group" style="display: flex; gap: 10px;">
          <select name="gender_${i}" required style="flex: 1;">
            <option value="">Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <select name="hostel_${i}" required style="flex: 1;">
            <option value="">Hostel</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
      </div>
    `;
  }
});

// Handle Form Submission
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // 1. Show Loading State
  const originalBtnText = submitBtn.innerText;
  submitBtn.disabled = true;
  submitBtn.innerText = "Submitting... Please wait";
  submitBtn.style.opacity = "0.7";
  submitBtn.style.cursor = "not-allowed";

  const college = form.college.value;
  const n = parseInt(countInput.value);
  const participants = [];

  for (let i = 1; i <= n; i++) {
    participants.push({
      name: form[`name_${i}`].value,
      gender: form[`gender_${i}`].value,
      hostel: form[`hostel_${i}`].value
    });
  }

  const formData = new URLSearchParams();
  formData.append("college", college);
  formData.append("participants", JSON.stringify(participants));

  try {
    // Replace with your LATEST deployment URL
    await fetch("https://script.google.com/macros/s/AKfycbxKyvrskkOQcE69rQxi7vDhGB-gDZJR_-k5_9r_eab0Jc7uC6QfCLl20J7RwFqRFwWjTQ/exec", {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString()
    });

    alert("Registration for " + college + " submitted successfully!");
    
    // Reset form and UI
    form.reset();
    container.innerHTML = "";
    
  } catch (error) {
    console.error("Submission Error:", error);
    alert("There was an error. Please check your internet and try again.");
  } finally {
    // 2. Restore Button State
    submitBtn.disabled = false;
    submitBtn.innerText = originalBtnText;
    submitBtn.style.opacity = "1";
    submitBtn.style.cursor = "pointer";
  }
});
