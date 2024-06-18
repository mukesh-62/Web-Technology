$(document).ready(function() {
    fetchHostels();
  
    $('#hostelForm').on('submit', function(event) {
      event.preventDefault();
      const hostelId = $('#hostelId').val();
      const hostel = {
        name: $('#name').val(),
        address: $('#address').val(),
        contact: $('#contact').val()
      };
  
      if (hostelId) {
        updateHostel(hostelId, hostel);
      } else {
        addHostel(hostel);
      }
    });
  });
  
  function fetchHostels() {
    $.get('http://localhost:3000/api/hostels', function(data) {
      let hostelList = '';
      data.forEach(hostel => {
        hostelList += `
          <tr>
            <td>${hostel.name}</td>
            <td>${hostel.address}</td>
            <td>${hostel.contact}</td>
            <td>
              <button class="btn btn-warning" onclick="editHostel('${hostel._id}', '${hostel.name}', '${hostel.address}', '${hostel.contact}')">Edit</button>
              <button class="btn btn-danger" onclick="deleteHostel('${hostel._id}')">Delete</button>
            </td>
          </tr>
        `;
      });
      $('#hostelList').html(hostelList);
    });
  }
  
  function addHostel(hostel) {
    $.ajax({
      url: 'http://localhost:3000/api/hostels',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(hostel),
      success: function(data) {
        fetchHostels();
        $('#hostelForm')[0].reset();
        $('#submitBtn').text('Add Hostel');
        $('#hostelId').val('');
      },
      error: function(error) {
        console.log(error);
      }
    });
  }
  
  function updateHostel(id, hostel) {
    $.ajax({
      url: `http://localhost:3000/api/hostels/${id}`,
      type: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify(hostel),
      success: function(data) {
        fetchHostels();
        $('#hostelForm')[0].reset();
        $('#submitBtn').text('Add Hostel');
        $('#hostelId').val('');
      },
      error: function(error) {
        console.log(error);
      }
    });
  }
  
  function editHostel(id, name, address, contact) {
    $('#hostelId').val(id);
    $('#name').val(name);
    $('#address').val(address);
    $('#contact').val(contact);
    $('#submitBtn').text('Update Hostel');
  }
  
  function deleteHostel(id) {
    $.ajax({
      url: `http://localhost:3000/api/hostels/${id}`,
      type: 'DELETE',
      success: function(data) {
        fetchHostels();
      },
      error: function(error) {
        console.log(error);
      }
    });
  }
  