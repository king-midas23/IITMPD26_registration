const countInput = document.getElementById("count");
const container = document.getElementById("participants");
const form = document.getElementById("regForm");

countInput.addEventListener("input", () => {
  const n = parseInt(countInput.value);
  container.innerHTML = "";

  if (!n || n < 1) return;

console.log(form);

for (let i = 1; i <= n; i++) {
  container.innerHTML += `
    <h4>Participant ${i}</h4>

    <input 
      name="name_${i}" 
      placeholder="Name" 
      required
    >

    <select 
      name="gender_${i}" 
      required
    >
      <option value="">Gender</option>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
      <option value="Other">Other</option>
    </select>

    <select 
      name="hostel_${i}" 
      required
    >
      <option value="">Hostel</option>
      <option value="Yes">Yes</option>
      <option value="No">No</option>
    </select>

    <br><br>
  `;
}

});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

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

  await fetch("https://script.google.com/macros/s/AKfycbxKyvrskkOQcE69rQxi7vDhGB-gDZJR_-k5_9r_eab0Jc7uC6QfCLl20J7RwFqRFwWjTQ/exec", {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify({ college, participants })
  });

  alert("Registration submitted!");
  form.reset();
  container.innerHTML = "";
});

