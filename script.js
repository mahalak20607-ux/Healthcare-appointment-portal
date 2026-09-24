document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("patientForm");
    const appointmentTable = document.getElementById("appointmentTable");

    const appointmentDateInput =
        document.getElementById("appointmentDate");

    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    appointmentDateInput.min = `${year}-${month}-${day}`;


    /* ================= FORM SUBMISSION ================= */

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        event.stopPropagation();

        if (!form.checkValidity()) {

            form.classList.add("was-validated");

            return;
        }


        /* Get form values */

        const patientName =
            document.getElementById("patientName").value.trim();

        const bloodGroup =
            document.getElementById("bloodGroup").value;

        const department =
            document.getElementById("department").value;

        const doctor =
            document.getElementById("doctor").value;

        const appointmentDate =
            document.getElementById("appointmentDate").value;

        const appointmentTime =
            document.getElementById("appointmentTime").value;

        const symptoms =
            document.getElementById("symptoms").value.trim();


        /* Create Appointment ID */

        const appointmentId =
            "APT-" + Math.floor(1000 + Math.random() * 9000);


        /* Format Date */

        const dateObject =
            new Date(appointmentDate + "T00:00:00");

        const formattedDate =
            dateObject.toLocaleDateString("en-GB");


        /* Format Time */

        const timeObject =
            new Date("1970-01-01T" + appointmentTime);

        const formattedTime =
            timeObject.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
            });


        /* Add appointment to table */

        const row =
            document.createElement("tr");

        row.innerHTML = `
            <td>${appointmentId}</td>

            <td>${escapeHTML(patientName)}</td>

            <td>${escapeHTML(department)}</td>

            <td>${escapeHTML(doctor)}</td>

            <td>${formattedDate}</td>

            <td>${formattedTime}</td>

            <td>
                <span class="badge bg-success">
                    Confirmed
                </span>
            </td>
        `;

        appointmentTable.appendChild(row);


        /* Update Health Information */

        document.getElementById("healthPatient").textContent =
            patientName;

        document.getElementById("healthBlood").textContent =
            bloodGroup;

        document.getElementById("healthDepartment").textContent =
            department;

        document.getElementById("healthDoctor").textContent =
            doctor;

        document.getElementById("healthDate").textContent =
            formattedDate;

        document.getElementById("healthTime").textContent =
            formattedTime;

        document.getElementById("healthSymptoms").textContent =
            symptoms;


        /* Success message */

        alert(
            "Appointment registered successfully!\n\n" +
            "Appointment ID: " + appointmentId
        );


        /* Reset form */

        form.reset();

        form.classList.remove("was-validated");


        /* Go to appointments */

        document.getElementById("appointments")
            .scrollIntoView({
                behavior: "smooth"
            });

    });


    /* ================= RESET ================= */

    form.addEventListener("reset", function () {

        form.classList.remove("was-validated");

    });


    /* ================= HTML ESCAPE ================= */

    function escapeHTML(value) {

        return value
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

});