using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using ProjectWith_OUTHelper.Models;
using ProjectWith_OUTHelper.Repository;
using Newtonsoft.Json;
using System.IO;

namespace ProjectWith_OUTHelper.Controllers
{
    public class EmployeeController : Controller
    {
        // GET: Employee
        EmpRepository EmpR = new EmpRepository();
        public ActionResult AddEmployee()
        {
            return View();
        }

        public ActionResult GetCountry()
        {
            string Data = string.Empty;
            DataTable Dt = new DataTable();
            Dt = EmpR.GetCountry();
            if (Dt.Rows.Count > 0)
            {
                Data = JsonConvert.SerializeObject(Dt);
            }
            return Json(Data, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetState(int id)
        {
            string Data = string .Empty;
            DataTable Dt = new DataTable();
            Dt = EmpR.GetState(id);
            if (Dt.Rows.Count > 0)
            {
                Data = JsonConvert.SerializeObject(Dt);
            }
            return Json(Data, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetCity(int id)
        {
            string Data = string.Empty;
            DataTable Dt = new DataTable();
            Dt = EmpR.GetCity(id);
            if (Dt.Rows.Count > 0)
            {
                Data = JsonConvert.SerializeObject(Dt);
            }

            return Json(Data, JsonRequestBehavior.AllowGet);
        }

        public JsonResult RegisterEmployee(Employee Emp)
        {
            string pic = string.Empty;
            try
            {
                if (Emp.Emp_Img != null)
                {
                     pic = DateTime.Now.ToString("ddmmyy_hhMMss") + Path.GetFileName(Emp.Emp_Img.FileName);
                    string path = Path.Combine(Server.MapPath("~/UploadedFiles"), pic);
                    Emp.Emp_Img.SaveAs(path);
                    //con.Open();
                    //SqlCommand cmd = new SqlCommand("USP_Emp_Add_Details", con);
                    //cmd.CommandType = CommandType.StoredProcedure;
                    //////cmd.Parameters.AddWithValue("@Emp_Name", Emp.Emp_Name);
                    //////cmd.Parameters.AddWithValue("@Emp_Sex", Emp.Emp_Sex);
                    //////cmd.Parameters.AddWithValue("@Emp_DOB", Emp.Emp_DOB);
                    //////cmd.Parameters.AddWithValue("@Emp_Address", Emp.Emp_Address);
                    //////cmd.Parameters.AddWithValue("@Emp_Email", Emp.Emp_Email);
                    //////cmd.Parameters.AddWithValue("@Emp_Country", Emp.Emp_Country);
                    //////cmd.Parameters.AddWithValue("@Emp_State", Emp.Emp_State);
                    //////cmd.Parameters.AddWithValue("@Emp_City", Emp.Emp_City);
                    //////cmd.Parameters.AddWithValue("@Emp_MobNo", Emp.Emp_MobNo);
                    //////cmd.Parameters.AddWithValue("@Emp_Salary", Emp.Emp_Salary);
                    //////cmd.Parameters.AddWithValue("@Emp_DevLang", Emp_DevLang);
                    //cmd.Parameters.AddWithValue("@Emp_Img", pic);
                    //int i = cmd.ExecuteNonQuery();
                    //con.Close();
                }
                ViewBag.FileStatus = "File uploaded successfully.";
            }
            catch (Exception)
            {
                ViewBag.FileStatus = "Error while file uploading."; ;
            }
            int i;
            i = EmpR.AddEmployee(Emp, pic);
            //con.Open();
            //SqlCommand com = new SqlCommand("F1_insert", con);
            //com.CommandType = CommandType.StoredProcedure;
            //com.Parameters.AddWithValue("@F_name", F1.name);
            //com.Parameters.AddWithValue("@F_age", F1.age);
            //com.Parameters.AddWithValue("@F_email", F1.email);
            //i = com.ExecuteNonQuery();
            //con.Close();
            return Json(i, JsonRequestBehavior.AllowGet);
        }

        public JsonResult UpdateEmployee(Employee Emp)
        {
            string pic = string.Empty;
            try
            {
                if (Emp.Emp_Img != null)
                {
                    pic = DateTime.Now.ToString("ddmmyy_hhMMss") + Path.GetFileName(Emp.Emp_Img.FileName);
                    string path = Path.Combine(Server.MapPath("~/UploadedFiles"), pic);
                    Emp.Emp_Img.SaveAs(path);
                    //con.Open();
                    //SqlCommand cmd = new SqlCommand("USP_Emp_Add_Details", con);
                    //cmd.CommandType = CommandType.StoredProcedure;
                    //////cmd.Parameters.AddWithValue("@Emp_Name", Emp.Emp_Name);
                    //////cmd.Parameters.AddWithValue("@Emp_Sex", Emp.Emp_Sex);
                    //////cmd.Parameters.AddWithValue("@Emp_DOB", Emp.Emp_DOB);
                    //////cmd.Parameters.AddWithValue("@Emp_Address", Emp.Emp_Address);
                    //////cmd.Parameters.AddWithValue("@Emp_Email", Emp.Emp_Email);
                    //////cmd.Parameters.AddWithValue("@Emp_Country", Emp.Emp_Country);
                    //////cmd.Parameters.AddWithValue("@Emp_State", Emp.Emp_State);
                    //////cmd.Parameters.AddWithValue("@Emp_City", Emp.Emp_City);
                    //////cmd.Parameters.AddWithValue("@Emp_MobNo", Emp.Emp_MobNo);
                    //////cmd.Parameters.AddWithValue("@Emp_Salary", Emp.Emp_Salary);
                    //////cmd.Parameters.AddWithValue("@Emp_DevLang", Emp_DevLang);
                    //cmd.Parameters.AddWithValue("@Emp_Img", pic);
                    //int i = cmd.ExecuteNonQuery();
                    //con.Close();
                }
                ViewBag.FileStatus = "File uploaded successfully.";
            }
            catch (Exception)
            {
                ViewBag.FileStatus = "Error while file uploading."; ;
            }
            int i;
            i = EmpR.UpdateEmployee(Emp, pic);
            //con.Open();
            //SqlCommand com = new SqlCommand("F1_insert", con);
            //com.CommandType = CommandType.StoredProcedure;
            //com.Parameters.AddWithValue("@F_name", F1.name);
            //com.Parameters.AddWithValue("@F_age", F1.age);
            //com.Parameters.AddWithValue("@F_email", F1.email);
            //i = com.ExecuteNonQuery();
            //con.Close();
            return Json(i, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllData()
        {
            string Data = string.Empty;
            DataTable Dt = new DataTable();
            Dt = EmpR.GetEmployeeList();
            if (Dt.Rows.Count > 0)
            {
                Data = JsonConvert.SerializeObject(Dt);
            }

            return Json(Data, JsonRequestBehavior.AllowGet);
        }

        public JsonResult EditData(int Empid)
        {
            string Data = string.Empty;
            DataTable Dt = new DataTable();
            Dt = EmpR.EditEmployee(Empid);
            if (Dt.Rows.Count > 0)
            {
                Data = JsonConvert.SerializeObject(Dt);
            }

            return Json(Data, JsonRequestBehavior.AllowGet);
        }


        public JsonResult DeleteData(int Empid)
        {

            int Succcess = EmpR.DeleteEmployee(Empid);

            return Json(Succcess, JsonRequestBehavior.AllowGet);
        }


    }
}
