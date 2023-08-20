let myFormEl = document.getElementById("myForm");
let nameErrorMsgEl = document.getElementById("nameErrorMsg");
let emailErrorMsgEl = document.getElementById("emailErrorMsg");
let nameEl = document.getElementById("name");
let emailEl = document.getElementById("email");
let workingStatusEl = document.getElementById("status");
let genderFemaleEl = document.getElementById("genderFemale");
let genderMaleEl = document.getElementById("genderMale");

let formData = {
    name: "",
    email: "",
    status: "Active",
    gender: "Male"
};

nameEl.addEventListener("change", function(event) {
    if (event.target.value === "") {
        nameErrorMsgEl.textContent = "Required*";
    } else {
        nameErrorMsgEl.textContent = "";
    }
    formData.name = event.target.value;
});

emailEl.addEventListener("change", function(event) {
    if (event.target.value === "") {
        emailErrorMsgEl.textContent = "Required*";
    } else {
        emailErrorMsgEl.textContent = "";
    }
    formData.email = event.target.value;
});

workingStatusEl.addEventListener("change", function(event) {
    formData.status = event.target.value;
});


genderMaleEl.addEventListener("change", function(event) {
    formData.gender = event.target.value;
});

genderFemaleEl.addEventListener("change", function(event) {
    formData.gender = event.target.value;
});

function validateFormData(formData) {
    let {
        name,
        email
    } = formData;
    if (name === "") {
        nameErrorMsgEl.textContent = "Required*";
    } else if (email === "") {
        emailErrorMsgEl.textContent = "Required*";
    }
}

function submitFormData(formData) {
    let url = "https://gorest.co.in/public-api/user";
    let options = {
        method: "GET",
        options: {
            "Content-Type": "applications/json",
            Accept: "applications/json",
            Authorization: "Bearer 00f3f8fde06120db02b587cc372c3d85510896e899b45774068bb750462acd9f"
        },
        body: JSON.stringify(formData)
    };
    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            if (jsonData.code === 422) {
                if (jsonData.data[0].message === "has already been taken") {
                    emailErrorMsgEl.textContent = "Email Already Exists";
                }
            }
        });
}

myFormEl.addEventListener("submit", function(event) {
    event.preventDefault();
    validateFormData(formData);
    submitFormData(formData);
});
