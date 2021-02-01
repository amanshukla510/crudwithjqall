using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using ProjectWith_OUTHelper.Models;

namespace ProjectWith_OUTHelper.Repository
{
    public class EmpRepository
    {
        SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString);

        public DataTable GetCountry()
        {
            con.Open();
            SqlCommand cmd = new SqlCommand("USP_Get_Country", con);
            cmd.CommandType = CommandType.StoredProcedure;
            SqlDataAdapter da = new SqlDataAdapter(cmd);
            DataTable dt = new DataTable();
            con.Close();
            da.Fill(dt);
            con.Close();
            return dt;
        }

        public DataTable GetState(int CountryId)
        {
            con.Open();
            SqlCommand cmd = new SqlCommand("USP_Get_State", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@tblCountry", CountryId);
            SqlDataAdapter da = new SqlDataAdapter(cmd);
            DataTable dt = new DataTable();
            con.Close();
            da.Fill(dt);
            con.Close();
            return dt;
        }

        public DataTable GetCity(int StateId)
        { 
            con.Open();
            SqlCommand cmd = new SqlCommand("USP_Get_City", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@tblState", StateId);
            SqlDataAdapter da = new SqlDataAdapter(cmd);
            DataTable dt = new DataTable();
            con.Close();
            da.Fill(dt);
            con.Close();
            return dt;
        }

        public int AddEmployee(Employee Emp, string pic)
        {
            con.Open();
            SqlCommand cmd = new SqlCommand("USP_Emp_Add_Details", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@Emp_Name", Emp.Emp_Name);
            cmd.Parameters.AddWithValue("@Emp_Sex", Emp.Emp_Sex);
            cmd.Parameters.AddWithValue("@Emp_DOB", Emp.Emp_DOB);
            cmd.Parameters.AddWithValue("@Emp_Address", Emp.Emp_Address);
            cmd.Parameters.AddWithValue("@Emp_Email", Emp.Emp_Email);
            cmd.Parameters.AddWithValue("@Emp_Country", Emp.Emp_Country);
            cmd.Parameters.AddWithValue("@Emp_State", Emp.Emp_State);
            cmd.Parameters.AddWithValue("@Emp_City", Emp.Emp_City);
            cmd.Parameters.AddWithValue("@Emp_MobNo", Emp.Emp_MobNo);
            cmd.Parameters.AddWithValue("@Emp_Salary", Emp.Emp_Salary);
            cmd.Parameters.AddWithValue("@Emp_DevLang", Emp.Emp_DevLang);
            cmd.Parameters.AddWithValue("@Emp_Img", pic);
            int i = cmd.ExecuteNonQuery();
            con.Close();
            if (i >= 1)
            {

                return i;

            }
            else
            {

                return i;
            }
        }

        public DataTable EditEmployee(int Empid)
        {
            con.Open();
            SqlCommand cmd = new SqlCommand("USP_Emp_Get_DetailsID", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@Emp_id",Empid);
            SqlDataAdapter da = new SqlDataAdapter(cmd);
            DataTable dt = new DataTable();
            con.Close();
            da.Fill(dt);
            con.Close();
            return dt;
        }

        public int UpdateEmployee(Employee Emp, string pic)
        {
            con.Open();
            SqlCommand cmd = new SqlCommand("USP_Emp_Update_Details", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@Emp_id", Emp.Emp_ID);
            cmd.Parameters.AddWithValue("@Name", Emp.Emp_Name);
            cmd.Parameters.AddWithValue("@City", Emp.Emp_DOB);
            cmd.Parameters.AddWithValue("@Address", Emp.Emp_Address);
            cmd.Parameters.AddWithValue("@Name", Emp.Emp_Name);
            cmd.Parameters.AddWithValue("@City", Emp.Emp_DOB);
            cmd.Parameters.AddWithValue("@Address", Emp.Emp_Address);
            cmd.Parameters.AddWithValue("@Name", Emp.Emp_Name);
            cmd.Parameters.AddWithValue("@City", Emp.Emp_DOB);
            cmd.Parameters.AddWithValue("@Address", Emp.Emp_Address);
            cmd.Parameters.AddWithValue("@Name", Emp.Emp_Name);
            cmd.Parameters.AddWithValue("@City", Emp.Emp_DOB);
            cmd.Parameters.AddWithValue("@Address", Emp.Emp_Address);
            cmd.Parameters.AddWithValue("@Emp_Img", pic);
            int i = cmd.ExecuteNonQuery();
            con.Close();
            if (i >= 1)
            {

                return i;

            }
            else
            {

                return i;
            }
        }

        public int DeleteEmployee(int ID)
        {
            con.Open();
            SqlCommand cmd = new SqlCommand("USP_Emp_Delete_Details", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@Emp_id", ID);
            int i = cmd.ExecuteNonQuery();
            con.Close();
            if (i >= 1)
            {

                return i;

            }
            else
            {

                return i;
            }
        }


        public DataTable GetEmployeeList()
        {
            con.Open();
            SqlCommand cmd = new SqlCommand("USP_Emp_Get_Details", con);
            cmd.CommandType = CommandType.StoredProcedure;
            SqlDataAdapter da = new SqlDataAdapter(cmd);
            DataTable dt = new DataTable();
            con.Close();
            da.Fill(dt);
            con.Close();
            return dt;
        }

        //}//To view employee details with generic list 
        //public List<EmpModel> GetAllEmployees()
        //{
        //    connection();
        //    List<EmpModel> EmpList = new List<EmpModel>();
        //    SqlCommand com = new SqlCommand("GetEmployees", con);
        //    com.CommandType = CommandType.StoredProcedure;
        //    SqlDataAdapter da = new SqlDataAdapter(com);
        //    DataTable dt = new DataTable();
        //    con.Open();
        //    da.Fill(dt);
        //    con.Close();
        //    //Uncooment if convert Datatable to list using AsEnumerable
        //    //List<DataRow> list = dt.AsEnumerable().ToList();
        //    //foreach (var item in list)
        //    //{
        //    //    EmpList.Add(

        //    //       new EmpModel
        //    //       {
        //    //           Empid = Convert.ToInt32(item["Id"]),
        //    //           Name = Convert.ToString(item["Name"]),
        //    //           City = Convert.ToString(item["City"]),
        //    //           Address = Convert.ToString(item["Address"])

        //    //       });
        //    //}

        //    //Uncomment if you wants to Bind EmpModel generic list using LINQ 
        //    //EmpList = (from DataRow dr in dt.Rows

        //    //        select new EmpModel()
        //    //        {
        //    //            Empid = Convert.ToInt32(dr["Id"]),
        //    //            Name = Convert.ToString(dr["Name"]),
        //    //            City = Convert.ToString(dr["City"]),
        //    //            Address = Convert.ToString(dr["Address"])
        //    //        }).ToList();


        //    //  Bind EmpModel generic list using dataRow
        //    foreach (DataRow dr in dt.Rows)
        //    {

        //        EmpList.Add(

        //            new EmpModel
        //            {

        //                Empid = Convert.ToInt32(dr["Id"]),
        //                Name = Convert.ToString(dr["Name"]),
        //                City = Convert.ToString(dr["City"]),
        //                Address = Convert.ToString(dr["Address"])

        //            }


        //            );


        //    }

        //    return EmpList;


        //}
        ////To Update Employee details
        //public bool UpdateEmployee(EmpModel obj)
        //{

        //    connection();
        //    SqlCommand com = new SqlCommand("UpdateEmpDetails", con);

        //    com.CommandType = CommandType.StoredProcedure;
        //    com.Parameters.AddWithValue("@EmpId", obj.Empid);
        //    com.Parameters.AddWithValue("@Name", obj.Name);
        //    com.Parameters.AddWithValue("@City", obj.City);
        //    com.Parameters.AddWithValue("@Address", obj.Address);
        //    con.Open();
        //    int i = com.ExecuteNonQuery();
        //    con.Close();
        //    if (i >= 1)
        //    {

        //        return true;

        //    }
        //    else
        //    {

        //        return false;
        //    }


        //}
        ////To delete Employee details
        //public bool DeleteEmployee(int Id)
        //{

        //    connection();
        //    SqlCommand com = new SqlCommand("DeleteEmpById", con);

        //    com.CommandType = CommandType.StoredProcedure;
        //    com.Parameters.AddWithValue("@EmpId", Id);

        //    con.Open();
        //    int i = com.ExecuteNonQuery();
        //    con.Close();
        //    if (i >= 1)
        //    {

        //        return true;

        //    }
        //    else
        //    {

        //        return false;
        //    }


        //}

    }
}
