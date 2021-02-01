var updateid = "";

$(document).ready(function () {
    //$("#txtDob").datepicker({});
    //$('#tblDisplayList').DataTable();
    //$("#ddlCountry").select2();
    //$("#ddlState").select2();
    //$("#ddlCity").select2(); 
    BindCountry();
    BindData();
    $("#ddlCountry").on('change', function (e) {
         BindState();
    });
    $("#ddlState").on('change', function (e) {
        BindCity();

    });
});

function BindCity(CityId="")
{
    if ($("#ddlState").val()!="") {

        $.ajax
            ({
                url: '/Employee/GetCity',
                type: 'get',
                data: { id: $("#ddlState").val() },
                success: function (Data) {
                    if (Data == "") {
                        $("#ddlCity").empty();
                        $('#ddlCity').append(new Option('Select City', ''));
                    }
                    else {
                        Data = JSON.parse(Data);
                        $("#ddlCity").empty();
                        $('#ddlCity').append(new Option('Select City', ''));
                        for (var i = 0; i < Data.length; i++) {
                            $("#ddlCity").append($('<option/>').attr("value", Data[i].City_ID).text(Data[i].City_Name));
                        }
                        if (CityId != "") {
                            $("#ddlCity").val(CityId);
                        }

                    }

                },
                error: function () {
                  
                    alert('City not found !!');
                }
            });
    } else {
        $("#ddlCity").empty();
        $('#ddlCity').append(new Option('Select City', ''));
    }
}

function BindCountry() {
    $.ajax(
        {
            url: '/Employee/GetCountry',
            type: 'post',
            success: function (Data) {
                Data = JSON.parse(Data);
                $("#ddlCountry").empty();
                $("#ddlState").empty();
                $("#ddlCity").empty();
                $('#ddlCountry').append(new Option('Select Country', ''));
                $('#ddlState').append(new Option('Select State', ''));
                $('#ddlCity').append(new Option('Select City', ''));
                for (var i = 0; i < Data.length; i++) {
                    $("#ddlCountry").append($('<option/>').attr("value", Data[i].Country_ID).text(Data[i].Country_Name));
                }
            },
            error: function () {
                alert('Country not found !!');
            }
        });
}

function BindState(StateId="",cityId="")
{
    if ($("#ddlCountry").val() != "")
    {
        $.ajax({
            url: '/Employee/GetState',
            type: 'get',
            data: { id: $("#ddlCountry").val() },
            success: function (Data) {
                debugger;
                if (Data == "") {
                    $("#ddlState").empty();
                    $('#ddlState').append(new Option('Select State', ''));
                    $("#ddlCity").empty();
                    $('#ddlCity').append(new Option('Select City', ''));
                } else {
                    Data = JSON.parse(Data);
                    $("#ddlState").empty();
                    $("#ddlCity").empty();
                    $('#ddlState').append(new Option('Select State', ''));
                    $('#ddlCity').append(new Option('Select City', ''));
                    for (var i = 0; i < Data.length; i++) {
                        $("#ddlState").append($('<option/>').attr("value", Data[i].State_ID).text(Data[i].State_Name));
                    }
                    if (StateId != "") {
                        $("#ddlState").val(StateId);
                        BindCity(cityId);
                    }
                }

            }, error: function () {
                $("#ddlState").empty();
                $("#ddlCity").empty();
                $('#ddlState').append(new Option('Select State', ''));
                $('#ddlCity').append(new Option('Select City', ''));
                alert('State not found !!');
            }
        });
    }
    else {
        $("#ddlState").empty();
        $("#ddlCity").empty();
        $('#ddlState').append(new Option('Select State', ''));
        $('#ddlCity').append(new Option('Select City', ''));
    }
}

function SubmitData() {


    var Language = '';
    $("input:checkbox[name=A]:checked").each(function () {
        //yourArray.push($(this).val());
        Language += $(this).val() + ',';
    });
    Language = Language.slice(0, -1);
    debugger;
    var Gender = $('input[name=Emp_Sex]:checked').val();

    // let validate = 0;
    //$('input[type="text"]').each(function () {
    //    if ($.trim($(this).val()) == '') {
    //        isValid = false;
    //        $(this).css({
    //            "border": "1px solid red",
    //            "background": "#FFCECE"
    //        });
    //        validate = 1;
    //    }
    //    else {
    //        $(this).css({
    //            "border": "",
    //            "background": ""
    //        });
    //    }

    //});

    //var ddlCountry = $("#ddlCountry");
    //if (ddlCountry.val() == "") {
    //    //If the "Please Select" option is selected display error.
    //    $("#ddlCountry").css({
    //        "border": "1px solid red",
    //        "background": "#FFCECE"
    //    });
    //    $("#ddlCountry").focus();
    //    return false;
    //}
    //else {
    //    $("#ddlCountry").css({
    //        "border": "",
    //        "background": ""
    //    });

    //}
    var Emp_Name = $('#txtName').val();
    var Emp_Sex = Gender;
    var Emp_DOB = $('#txtDob').val();
    var Emp_Address = $('#txtAddress').val();
    var Emp_Email = $('#txtEmail').val();

    var formData = new FormData();
    var totalFiles = document.getElementById("picfile").files.length;
    var Emp_Img = document.getElementById("picfile").files[0];
    formData.append("Emp_Img", Emp_Img);
    formData.append("Emp_Name", Emp_Name);
    formData.append("Emp_Email", Emp_Email);
    formData.append("Emp_DOB", Emp_DOB);
    formData.append("Emp_Sex", Gender);
    formData.append("Emp_MobNo", $('#txtMobile').val());
    formData.append("Emp_Country", $('#ddlCountry').val());
    formData.append("Emp_State", $('#ddlState').val());
    formData.append("Emp_City", $('#ddlCity').val());
    formData.append("Emp_Salary", $('#txtSalary').val());
    formData.append("Emp_DevLang", Language);



    //var empObj =
    //{

    //    // Emp_ID :$('#txtname').val(),
    //    Emp_Name: $('#txtName').val(),
    //    // Emp_Sex: $('#rdbGender').val(),
    //    Emp_Sex: Gender,
    //    Emp_DOB: $('#txtDob').val(),
    //    Emp_Address: $('#txtAddress').val(),
    //    Emp_Email: $('#txtEmail').val(),
    //    Emp_Country: $('#ddlCountry').val(),
    //    Emp_State: $('#ddlState').val(),
    //    Emp_City: $('#ddlCity').val(),
    //    Emp_MobNo: $('#txtMobile').val(),
    //    Emp_Salary: $('#txtSalary').val(),
    //    Emp_DevLang: Language
    //    // Emp_Img: $('#txtname').val(),
    //}

    if (updateid == "") {
        $.ajax(
            {
                url: "/Employee/RegisterEmployee",
                // data: JSON.stringify(empObj),
                data: formData,
                //        dataType: 'json',
                contentType: false,
                processData: false,
                type: "POST",
                //contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (result) {
                    alert("Data Successfuly Submit");

                    BindData();
                    ClearData();
                },
                error: function (errormessage) {
                    alert(errormessage.responseText);
                }
            });
    }
    else {
        $.ajax(
            {
                url: "/Employee/UpdateEmployee",
                // data: JSON.stringify(empObj),
                data: formData,
                //        dataType: 'json',
                contentType: false,
                processData: false,
                type: "POST",
                //contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (result) {
                    alert("Data Successfuly Submit");

                    BindData();
                    ClearData();
                },
                error: function (errormessage) {
                    alert(errormessage.responseText);
                }
            });
    }
   

}

function BindData() {
    $.ajax({
        url: '/Employee/GetAllData',
        type: 'post',
        data: {},
        success: function (Data)
        {
            if (Data !== null && Data !== undefined && Data !== "")
            {
                Data = JSON.parse(Data);
                $("#tblDisplayList tbody").find("tr:gt(0)").remove();
                //for (var i = 0; i < Data.length; i++) {
                //    $("#tblDisplayList").append('<tr><td>' + Data[i].Emp_Name + '</td><td>' + Data[i].Emp_MobNo + '</td><td>' + Data[i].Emp_Address + '</td><td><input type="button" id="btndelete" class="btn btn-success btn-lg btn-block" value="Delete" onclick="DeleteData(' + Data[i].Emp_ID + ')" /></td><td><input type="button" id="btnedit" value="Edit" class="btn btn-success btn-lg btn-block" onclick="EditData(' + Data[i].Emp_ID + ')" /></td></tr>');
                // $("#tblDisplayList").append('<td><input type="button" id="btndelete" class="btn btn-success btn-lg btn-block" value="Delete" onclick="DeleteData(' + Data[i].Emp_ID + ')" /></td>');

                //}

                var tr;
                //Append each row to html table  
                for (var i = 0; i < Data.length; i++) {
                    var Gender = (Data[i].Emp_Sex == 1) ? 'Male' : (Data[i].Emp_Sex == 2) ? 'Female' : 'Other';
                    tr = $('<tr/>');

                    //  tr.append("<td>" + Data[i].Emp_Img + "</td>");

                    //$("#imageBox").html('<img src="' + this.href + '" />');
                  
                    tr.append('<td><img src= "../UploadedFiles/' + Data[i].Emp_Img + '" style="height:200px;width:200px;"/> </td>');
          

                    tr.append("<td>" + Data[i].Emp_Name + "</td>");

                    tr.append("<td>" + Data[i].Emp_DOB + "</td>");

                    tr.append("<td>" + Data[i].Emp_Address + "</td>");

                    tr.append("<td>" + Data[i].Emp_Email + "</td>");

                    tr.append("<td>" + Gender + "</td>");

                    tr.append("<td>" + Data[i].Emp_MobNo + "</td>");

                    tr.append("<td>" + Data[i].Emp_Country + "</td>");

                    tr.append("<td>" + Data[i].Emp_State + "</td>");

                    tr.append("<td>" + Data[i].Emp_City + "</td>");

                    tr.append("<td>" + Data[i].Emp_Salary + "</td>");

                    tr.append("<td>" + Data[i].Emp_DevLang + "</td>");

                    tr.append('<td><input type="button" id="btndelete" class="btn btn-success btn-lg btn-block" value="Delete" onclick="DeleteData(' + Data[i].Emp_ID + ')" /><input type="button" id="btnedit" value="Edit" class="btn btn-success btn-lg btn-block" onclick="EditData(' + Data[i].Emp_ID + ')" /></td>');
                    $("#tblDisplayList tbody").append(tr);
                }
              
                // $('#tblDisplayList').dataTable().fnDestroy();
                // $('#tblDisplayList').dataTable().fnDestroy();
                $('#tblDisplayList').DataTable();
            }
            else
            {
                $('#tblDisplayList').dataTable().fnDestroy();
                $('#tblDisplayList').DataTable();
            }

        },
        error: function () {
            alert('Record not found !!');
        }
    });
}

function EditData(id) {
    $.ajax
        ({
            url: '/Employee/EditData',
            type: 'get',
            data: { Empid: id },
            success: function (Data)
            {
                debugger;
                Data = JSON.parse(Data);
                //   (':radio[value="' + Data[0].Emp_Sex + '"]').attr('checked', 'checked')
                (Data[0].Emp_Sex == 1) ? $('input[name="Emp_Sex"][value="' + Data[0].Emp_Sex + '"]').attr('checked', true) : (Data[0].Emp_Sex == 2) ? $('input[name="Emp_Sex"][value="' + Data[0].Emp_Sex + '"]').attr('checked', true) : $('input[name="Emp_Sex"][value="' + Data[0].Emp_Sex + '"]').attr('checked', true);
                $("#txtName").val(Data[0].Emp_Name);
                $("#txtAddress").val(Data[0].Emp_Address);
               // $("#txtDob").val("2017-06-21");
                $("#txtDob").val(Data[0].Emp_DOB);
              //  $('#txtDob').val(Date.parse((Data[0].Emp_DOB).toString('yyyy-MM-dd')));
                $("#btnsave").val("Update");
                $("#ddlCountry").val(Data[0].Emp_Country);
               // $("#ddlState").val(Data[0].Emp_State);
                BindState(Data[0].Emp_State, Data[0].Emp_City); 
                //$("#ddlState").val();
               // BindCity(Data[0].Emp_City);
                //$("#ddlCity").val(Data[0].Emp_City);  
                $("#user_img").attr("src", "../UploadedFiles/" + Data[0].Emp_Img + "");
                //$('input[name=Emp_Sex]').each(function ()
                //{
                //    if (this.value == Data[0].Emp_Sex)
                //    {
                //        $(this).prop('checked', true);
                //        return false;
                //    }
                //});
                alert(id);
                alert

                updateid = id;
                //$('#divcheckbox input:checkbox').attr('checked', '');

                $('input:checkbox[name=A]').each(function () { $(this).prop('checked', false); });
                if (Data[0].Emp_DevLang !== null && Data[0].Emp_DevLang !== undefined)
                {
                    let selectedchk = Data[0].Emp_DevLang.split(',');

                    for (var i = 0; i < selectedchk.length; i++)
                    {
                        let Currentchkbx = selectedchk[i];
                        $('input:checkbox[name=A]').each(function ()
                        {
                            if (this.value == Currentchkbx) {
                                $(this).prop('checked', true);
                                return false;
                            }
                        });
                    }
                }
                else
                {
                  


                    //    .each(function () {
                        
                    //        $(this).prop('checked', false);                 
                    //});
                }
            },
            error: function () {

                alert('Data not Edit !!');
            }
        });
}

function ClearData()
{
    updateid = "";
    $('input:radio[name=Emp_Sex]:checked').prop('checked', false);
    $('input:checkbox[name=A]').each(function () { $(this).prop('checked', false); });
}

function DeleteData(id)
{
    $.ajax(
        {
            url: "/Employee/DeleteData",
            type: 'get',
            data: { Empid: id },
            success: function (Data) {
                alert("Data Successfuly delete");

                BindData();
              
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });

}

function show(input) {
    if (input.files && input.files[0]) {
        var filerdr = new FileReader();
        filerdr.onload = function (e) {
            $('#user_img').attr('src', e.target.result);
        }
        filerdr.readAsDataURL(input.files[0]);
    }
}


   //End state
    //    $("#submitForm").on("change", function () {
    //        debugger;
    //        var formData = new FormData(this);
    //        $.ajax({
    //            url: "/Employee/upload",
    //            type: "POST",
    //            cache: false,
    //            contentType: false, // you can also use multipart/form-data replace of false
    //            processData: false,
    //            data: formData,
    //            success: function (response) {
    //                $("#preview").show();
    //                $("#imageView").html(response);
    //                $("#image").val('');
    //                alert("Image uploaded Successfully");
    //            }
    //        });
    //    });
//$(document).ready(function () {
    //    $('#txtDOB').datepicker({
    //        dateFormat: 'dd/mm/yy',
    //        changeMonth: true,
    //        changeYear: true,
    //        yearRange: '1950:2100'
    //    });
    //    $('#ddlCountry').select2();
    //    $("#ddlstate").select2();
    //    $("#ddlcity").select2();
    //    $("#ddlnationality").select2();
    //    $("#ddldepartment").select2();
    //    DisplayData();
    //    onLoadData();
    //    BindDepartment();
    //    BindNationlity();
    //    $("#ddlCountry").on('change', function (e) {
    //    $.ajax({
    //        type: 'post',
    //        contentType: "application/json; charset=utf-8",
    //        dataType: "json",
    //        data: "{'A':'" + $("#ddlCountry").val() + "'}",
    //        url: 'EmpDetails.aspx/StateBind',
    //        success: function (resp) {
    //            let result = JSON.parse(resp.d);
    //            let ddl = '<option value=""> Select State </option>';
    //            for (var i = 0; i < result.length; i++) {
    //                ddl += '<option value="' + result[i].St_ID + '">' + result[i].St_Name + '</option>';
    //            }
    //            $('#ddlstate').html(ddl);
    //        }
    //    });
    //    });
    //    $("#ddlstate").on('change', function (e) {
    //    $.ajax({
    //        type: 'post',
    //        contentType: "application/json; charset=utf-8",
    //        dataType: "json",
    //        data: "{'A':'" + $("#ddlstate").val() + "'}",
    //        url: 'EmpDetails.aspx/CityBind',
    //        success: function (resp) {
    //            let result = JSON.parse(resp.d);
    //            let ddl = '<option value=""> Select City </option>';
    //            for (var i = 0; i < result.length; i++) {
    //                ddl += '<option value="' + result[i].Ct_ID + '">' + result[i].Ct_Name + '</option>';
    //            }
    //            $('#ddlcity').html(ddl);
    //        }
    //    });
    //    });
    //});

    //function onLoadData() {
    //    debugger;
    //    $.ajax({
    //    type: 'post',
    //        contentType: "application/json; charset=utf-8",
    //        dataType: "json",
    //        url: 'EmpDetails.aspx/PageLoadData',
    //        success: function (resp) {
    //    let result = JSON.parse(resp.d).Table;
    //            let ddl = '<option value=""> Select Country </option>';
    //            for (var i = 0; i < result.length;
    //                {
    //    ddl += '<option value="' + result[i].Cn_ID + '">' + result[i].Cn_Name + '</option>';
    //            }
    //            $('#ddlCountry').html(ddl);
    //        }
    //    });
    //}

    //function BindDepartment() {
    //    debugger;
    //    $.ajax({
    //    type: 'post',
    //        contentType: "application/json; charset=utf-8",
    //        dataType: "json",
    //        url: 'EmpDetails.aspx/BindDepartment',
    //        success: function (resp) {
    //    let result = JSON.parse(resp.d).Table;
    //            let ddl = '<option value=""> Select Department </option>';
    //            for (var i = 0; i < result.length; {
    //    ddl += '<option value="' + result[i].Dep_ID + '">' + result[i].Dep_Name + '</option>';
    //            }
    //            $('#ddldepartment').html(ddl);
    //        }
    //    });
    //}

    //function BindNationlity() {
    //    debugger;
    //    $.ajax({
    //    type: 'post',
    //        contentType: "application/json; charset=utf-8",
    //        dataType: "json",
    //        url: 'EmpDetails.aspx/BindNationlity',
    //        success: function (resp) {
    //    let result = JSON.parse(resp.d).Table;
    //            let ddl = '<option value=""> Select Nationality </option>';
    //            for (var i = 0; i < result.length; {
    //    ddl += '<option value="' + result[i].Nation_ID + '">' + result[i].Nationlity + '</option>';
    //            }
    //            $('#ddlnationality').html(ddl);
    //        }
    //    });
    //}



    //function SaveData() {
    //    debugger;
    //    var yourArray = '';
    //    $("input:checkbox[name=A]:checked").each(function () {
    //    //yourArray.push($(this).val());
    //    yourArray += ',' + $(this).val();
    //    });

    //    var Gender = $('input[name=gender]:checked').val();
    //    alert(Gender);
    //    $.ajax({
    //    url: 'EmpDetails.aspx/InsertEmployeeData',
    //        type: 'post',
    //        contentType: 'application/json;charset=utf-8',
    //        dataType: 'json',
    //        data: "{Mob : '" + $("#txtmobile").val() + "',fn : '" + $("#txtfname").val() + "', ln : '" + $("#txtlname").val() + "', Dep : '" + $("#ddldepartment").val() + "', Nationality : '" + $("#ddlnationality").val() + "', DOB : '" + $("#txtDOB").val() + "',Email : '" + $("#txtemail").val() + "',Age : '" + $("#txtage").val() + "',Gen : '" + Gender + "',Country : '" + $("#ddlCountry").val() + "',State : '" + $("#ddlstate").val() + "',City : '" + $("#ddlcity").val() + "',Lang : '" + yourArray + "'}",
    //        success: function () {
    //    alert('Inserted Successfuly !!');

    //        },
    //        error: function () {
    //    alert('Not Inserted !!!');
    //        }
    //    });
    //}
    //function DisplayData() {
    //    $.ajax({
    //        type: 'post',
    //        contentType: "application/json; charset=utf-8",
    //        dataType: "json",
    //        url: 'EmpDetails.aspx/GetEmpData',
    //        success: function (resp) {
    //            let result = JSON.parse(resp.d);
    //            let table = '';
    //            result.forEach(function (item) {
    //                table += '<tr style="color:black;"><td>' + item.EmpName + '</td><td>' + item.EmpDep + '</td><td><input type="button" class="btn btn-success btn-lg btn-block" id="btndelete" onclick="DeleteData(' + item.EmpId + ')" value="Delete" /></td></tr>';
    //            });
    //            $('#tbody').html(table);
    //            //$("#btndelete").on('click', function () {
    //            //    debugger;
    //            //    alert("button");
    //            //});
    //            $('#tbl').dataTable().fnDestroy();
    //            $('#tbl').DataTable();

    //        }

    //    });
    //}



    //    $(function () {
    //        $('#txtage').datepicker(
    //            {
    //                dateFormat: 'dd/mm/yy',
    //                changeMonth: true,
    //                changeYear: true,
    //                yearRange: '1950:2100'
    //            });
    //})



    //function BindCountry() {
    //    $.ajax(
    //        {
    //            url: 'Employee/GetCountry',
    //            type: 'post',
    //            success: function (Data) {
    //                alert(Data);
    //                Data = JSON.parse(Data);
    //                for (var i = 0; i < Data.length; i++) {
    //                    $("#ddlCountry").append($('<option/>').attr("value", Data[i].Country_ID).text(Data[i].Country_Name));
    //                }
    //            },
    //            error: function () {
    //                alert('Country not found !!');
    //            }
    //        });
    //}
        //    success: function (resp) {
        //        let result = JSON.parse(resp.d).Table;
        //        let ddl = '<option value=""> Select Country </option>';
        //        for (var i = 0; i < result.length;
        //            {
        //                ddl += '<option value="' + result[i].Cn_ID + '">' + result[i].Cn_Name + '</option>';
        //            }
        //        $('#ddlCountry').html(ddl);
        //    }
        //});



    //$("#btncatsave").click(function () {
    //    var Name = $("#txtName").val();
    //    var formData = new FormData();
    //    var totalFiles = document.getElementById("picfile").files.length;

    //    var file = document.getElementById("picfile").files[0];
    //    formData.append("FileUpload", file);
    //    formData.append("Name", Name);

    //    $.ajax({
    //        type: "POST",
    //        url: '/Category_Subcategory/Save_Category',
    //        data: formData,
    //        dataType: 'json',
    //        contentType: false,
    //        processData: false,
    //        success: function (msg) {

    //            alert(msg);

    //        },
    //        error: function (error) {
    //            alert("errror");
    //        }
    //    });

    //});