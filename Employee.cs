using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ProjectWith_OUTHelper.Models
{
    public class Employee
    {
        public string Emp_ID { get; set; }
        public string Emp_Name { get; set; }
        public string Emp_Sex { get; set; }
        public string Emp_DOB { get; set; }
        public string Emp_Address { get; set; }
        public string Emp_Email { get; set; }
        public string Emp_Country { get; set; }
        public string Emp_State { get; set; }
        public string Emp_City { get; set; }
        public string Emp_MobNo { get; set; }
        public string Emp_Salary { get; set; }
        public HttpPostedFileBase Emp_Img { get; set; }
        public string Emp_DevLang { get; set; }
        //public string Country_ID { get; set; }
        //public string Country_Name { get; set; }
    }
}