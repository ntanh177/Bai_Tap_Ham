//QUAN LY TUYEN SINH
function tinhDiem() {
  var diemChuan = parseFloat(document.getElementById("diemChuan").value);
  var diemMon1 = parseFloat(document.getElementById("diemMon1").value);
  var diemMon2 = parseFloat(document.getElementById("diemMon2").value);
  var diemMon3 = parseFloat(document.getElementById("diemMon3").value);
  var khuVuc = document.getElementById("khuVuc").value;
  var doiTuong = document.getElementById("doiTuong").value;

  // Tính điểm ưu tiên theo khu vực
  var diemUuTienKhuVuc = 0;
  if (khuVuc === "A") {
    diemUuTienKhuVuc = 2;
  } else if (khuVuc === "B") {
    diemUuTienKhuVuc = 2.5;
  } else if (khuVuc === "C") {
    diemUuTienKhuVuc = 0.5;
  }

  // Tính điểm ưu tiên theo đối tượng
  var diemUuTienDoiTuong = 0;
  if (doiTuong === "1") {
    diemUuTienDoiTuong = 2.5;
  } else if (doiTuong === "2") {
    diemUuTienDoiTuong = 1.5;
  } else if (doiTuong === "3") {
    diemUuTienDoiTuong = 1;
  }

  // Tính điểm tổng kết
  var diemTongKet = diemMon1 + diemMon2 + diemMon3 + diemUuTienKhuVuc + diemUuTienDoiTuong;

  // Kiểm tra thí sinh đậu hay rớt
  var ketQua = "";
  if (diemTongKet >= diemChuan && diemMon1 > 0 && diemMon2 > 0 && diemMon3 > 0) {
    ketQua = "Thí sinh đậu!";
  } else {
    ketQua = "Thí sinh rớt!";
  }

  // Hiển thị kết quả lên giao diện
  document.getElementById("ketQua").innerHTML = "Kết quả: " + ketQua + "<br>Tổng điểm: " + diemTongKet;
}

//TINH TIEN DIEN
document.addEventListener('DOMContentLoaded', function() {
    var form = document.querySelector('form');
    form.addEventListener('submit', function(event) {
      event.preventDefault();
  
      var nameInput = document.querySelector('#name');
      var consumptionInput = document.querySelector('#consumption');
      var resultDiv = document.querySelector('#result');
  
      var name = nameInput.value;
      var consumption = parseFloat(consumptionInput.value);
  
      var totalCost = calculateElectricityBill(consumption);
      resultDiv.innerHTML = 'Tên: ' + name + '<br>Tiền điện: ' + totalCost.toFixed(2) + 'đ';
    });
  
    function calculateElectricityBill(consumption) {
      var cost = 0;
      if (consumption <= 50) {
        cost = consumption * 500;
      } else if (consumption <= 100) {
        cost = 50 * 500 + (consumption - 50) * 650;
      } else if (consumption <= 200) {
        cost = 50 * 500 + 50 * 650 + (consumption - 100) * 850;
      } else if (consumption <= 350) {
        cost = 50 * 500 + 50 * 650 + 100 * 850 + (consumption - 200) * 1100;
      } else {
        cost = 50 * 500 + 50 * 650 + 100 * 850 + 150 * 1100 + (consumption - 350) * 1300;
      }
      return cost;
    }
  });


//TINH THUE THU NHAP CA NHAN
document.getElementById("taxForm").addEventListener("submit", function(event) {
  event.preventDefault();

  // Lấy thông tin từ form
  var fullName = document.getElementById("fullName").value;
  var income = parseFloat(document.getElementById("income").value);
  var dependents = parseInt(document.getElementById("dependents").value);

  // Tính thuế
  var taxableIncome = income - 4000000 - dependents * 1600000;
  var taxAmount = calculateTaxAmount(taxableIncome);

  // Hiển thị kết quả
  document.getElementById("taxAmount").textContent = formatCurrency(taxAmount);
  document.getElementById("result").style.display = "block";
});

// Hàm tính số tiền thuế dựa trên thu nhập chịu thuế
function calculateTaxAmount(taxableIncome) {
  var taxAmount = 0;

  if (taxableIncome > 96000000) {
      taxAmount = (taxableIncome - 96000000) * 0.35 + 22000000;
  } else if (taxableIncome > 62400000) {
      taxAmount = (taxableIncome - 62400000) * 0.3 + 11400000;
  } else if (taxableIncome > 38400000) {
      taxAmount = (taxableIncome - 38400000) * 0.25 + 6500000;
  } else if (taxableIncome > 21000000) {
      taxAmount = (taxableIncome - 21000000) * 0.2 + 2800000;
  } else if (taxableIncome > 12000000) {
      taxAmount = (taxableIncome - 12000000) * 0.15 + 800000;
  } else if (taxableIncome > 6000000) {
      taxAmount = (taxableIncome - 6000000) * 0.1 + 200000;
  } else if (taxableIncome > 0) {
      taxAmount = taxableIncome * 0.05;
  }

  return taxAmount;
}

// Hàm định dạng số tiền thành chuỗi định dạng tiền tệ
function formatCurrency(amount) {
  var formatter = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND"
  });

  return formatter.format(amount);
}


//TINH TIEN CAP
function handleCustomerTypeChange() {
  var customerType = document.getElementById("customerType").value;
  var connectionCountInput = document.getElementById("connectionCount");

  if (customerType === "business") {
    connectionCountInput.disabled = false;
    connectionCountInput.style.display = "block";
  } else {
    connectionCountInput.disabled = true;
    connectionCountInput.style.display = "none";
  }
}

function calculateBill() {
  var customerType = document.getElementById("customerType").value;
  var connectionCount = parseInt(document.getElementById("connectionCount").value);
  var premiumChannels = parseInt(document.getElementById("premiumChannels").value);

  var bill = 0;

  if (customerType === "residential") {
    bill = 4.5 + 20.5 + (7.5 * premiumChannels);
  } else if (customerType === "business") {
    var baseServiceFee = 15;
    var baseConnections = 10;
    var additionalConnectionsFee = 5;

    if (connectionCount <= baseConnections) {
      bill = baseServiceFee + (75 * premiumChannels);
    } else {
      var additionalConnections = connectionCount - baseConnections;
      bill = baseServiceFee + (75 * premiumChannels) + (additionalConnections * additionalConnectionsFee);
    }
  }

  document.getElementById("result").innerHTML = "Tổng tiền cáp: $" + bill.toFixed(2);
}

