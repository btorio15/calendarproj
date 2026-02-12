let currentEditingEvent = null;

function updateLocationOptions(value) {

    const location = document.getElementById("location_group");
    const remote = document.getElementById("remote_group");

    if (value == "in-person") {
        location.classList.remove('d-none');
        remote.classList.add('d-none');
    } else if (value == "remote") {
        location.classList.add('d-none');
        remote.classList.remove('d-none');
    } else {
        location.classList.add('d-none');
        remote.classList.add('d-none');
    }
    
}
function saveEvent() {

    if (!validationCheck()) return;

    const name = document.getElementById("event_name").value;
    const weekday = document.getElementById("event_weekday").value;
    const time = document.getElementById("event_time").value;
    const irl = document.getElementById("event_modality").value;
    let url = document.getElementById("event_remote_url").value;
    let location = document.getElementById("event_location").value;
    const attendees = document.getElementById("event_attendees").value;
    const category = document.getElementById("event_category").value;

    if (url === "") url = null;
    if (location === "") location = null;

    const eventDetails = {
        name: name,
        weekday: weekday,
        time: time,
        modality: irl,
        location: location,
        remote_url: url,
        attendees: attendees,
        category: category
    };

    // existing event check
    if(currentEditingEvent){
        currentEditingEvent.remove();
        currentEditingEvent = null;
    }

    addEventToCalendarUI(eventDetails);
    const myModalElement = document.getElementById('event_modal');
    const myModal = bootstrap.Modal.getOrCreateInstance(myModalElement);
    myModal.hide();
}
function addEventToCalendarUI(eventInfo){
    document.getElementById('event_form').reset();
    let event_card = createEventCard(eventInfo);
    let curdiv = document.getElementById(eventInfo.weekday);
    curdiv.appendChild(event_card)


}
function createEventCard(eventDetails){
    let event_element = document.createElement("div");
    event_element.classList = "event border rounded-3 p-2 m-1";
    event_element.eventData = eventDetails;
    let info = document.createElement("div");
    if(eventDetails.location == null){
        info.innerHTML = 
        `<strong>
            Event Name: 
        </strong>
        <br>
        ${eventDetails.name}
        <br>
        <strong>
            Event Time: 
        </strong>
        <br>
        ${eventDetails.time}
        <br>
        <strong>
            Category: 
        </strong>
        <br>
        ${eventDetails.category}
        <br>
        <strong>
            Event Modality: 
        </strong>
        <br>
            ${eventDetails.modality}
        <br>
        <strong>
            Event Url: 
        </strong>
        <br>
            ${eventDetails.url}
        <br>
        <strong>
            Attendees: 
        </strong>
        <br>
            ${eventDetails.attendees}
        <br>`;

    } else {
        info.innerHTML = 
        `<strong>
            Event Name: 
        </strong>
        <br>
        ${eventDetails.name}
        <br>
        <strong>
            Event Time: 
        </strong>
        <br>
        ${eventDetails.time}
        <br>
        <strong>
            Category: 
        </strong>
        <br>
        ${eventDetails.category}
        <br>
        <strong>
            Event Modality: 
        </strong>
        <br>
            ${eventDetails.modality}
        <br>
        <strong>
            Event Location: 
        </strong>
        <br>
            ${eventDetails.location}
        <br>
        <strong>
            Attendees: 
        </strong>
        <br>
            ${eventDetails.attendees}
        <br>`;

    }

    if(eventDetails.category == "Academic"){
        event_element.style.backgroundColor = "lightcoral"
    }
    if(eventDetails.category == "Professional"){
        event_element.style.backgroundColor = "mediumseagreen"
    }
    if(eventDetails.category == "Leisure"){
        event_element.style.backgroundColor = "lightskyblue"
    }

    event_element.appendChild(info)

    // modal click to open
    event_element.addEventListener("click", function () {
        openModal(event_element);
    });
    
    return event_element;
}

function openModal(eventCard){

    currentEditingEvent = eventCard;
    const data = eventCard.eventData;

    document.getElementById("event_name").value = data.name;
    document.getElementById("event_weekday").value = data.weekday;
    document.getElementById("event_time").value = data.time;
    document.getElementById("event_modality").value = data.modality;
    document.getElementById("event_attendees").value = data.attendees;
    document.getElementById("event_category").value = data.category;
    document.getElementById("event_location").value = data.location || "";
    document.getElementById("event_remote_url").value = data.remote_url || "";

    updateLocationOptions(data.modality);

    const modal = bootstrap.Modal.getOrCreateInstance(
        document.getElementById("event_modal")
    );
    modal.show();
}

function validationCheck() {
    let valid = true;

    const fields = [
        "event_name",
        "event_weekday",
        "event_category",
        "event_time",
        "event_modality",
        "event_attendees",
        "event_category"
    ];

    fields.forEach(id => {
        const input = document.getElementById(id);
        if (!input.value) {
            input.classList.add("is-invalid");
            valid = false;
        } else {
            input.classList.remove("is-invalid");
        }
    });
    // Modality-specific fields
    const modality = document.getElementById("event_modality").value;
    if (modality === "in-person") {
        const location = document.getElementById("event_location");
        if (!location.value) {
            location.classList.add("is-invalid");
            valid = false;
        } else {
            location.classList.remove("is-invalid");
        }
    }
    if (modality === "remote") {
        const remote = document.getElementById("event_remote_url");
        if (!remote.value) {
            remote.classList.add("is-invalid");
            valid = false;
        } else {
            remote.classList.remove("is-invalid");
        }
    }
    return valid;
}
