using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Boilerplate.Web.App.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace Boilerplate.Web.App.Controllers
{
    public class CustomerController : Controller
    {
        OnBoardTAskContext databaseContext = new OnBoardTAskContext();
        [HttpGet]
        public JsonResult GetCustomerJson()
        {
            try
            {
                //using (var db = new OnBoardTAskContext())
                //{
                return Json(databaseContext.Customer.Select(x => new
                {
                    x.Id,
                    x.Address,
                    x.Name
                }).ToList());
                //return new JsonResult(databaseContext.Customer.ToList());
                //}
            }catch(Exception e)
            {
                return Json(e.Message);
            }

        }
        [HttpGet]
        public ActionResult Create()
        {
            return View();
        }



        [HttpPost]
        public JsonResult Create(Customer customer)
        {
            if (ModelState.IsValid)
            {

                databaseContext.Customer.Add(customer);
                databaseContext.SaveChanges();
                return Json("Index");
            }
            return new JsonResult(customer);
        }
        [HttpGet]
        public JsonResult Edit(int id)

        {
            //OnBoardTAskContext db = new OnBoardTAskContext();

            Customer customer = databaseContext.Customer.Where(x => x.Id == id).SingleOrDefault();

            string value = JsonConvert.SerializeObject(customer, Formatting.Indented, new JsonSerializerSettings

            {

                ReferenceLoopHandling = ReferenceLoopHandling.Ignore

            });
            return Json(customer);
        }
        [HttpPost]

        public JsonResult Edit(Customer customer)
        {
           
                // Customer cust = databaseContext.Customer.Where(x => x.Id == customer.Id).SingleOrDefault();
                // var Customer = databaseContext.Customer.FirstOrDefault(x => x.Id == customer.Id);
                var Customer = databaseContext.Customer.Where(x => x.Id == customer.Id).SingleOrDefault();
                Customer.Name = customer.Name;
                Customer.Address = customer.Address;
                databaseContext.SaveChanges();
                return new JsonResult(customer);
        }



        //delete
        [HttpGet]
        public JsonResult GetDeleteCustomer(int id)
           {
            Customer customer = databaseContext.Customer.Where(x => x.Id == id).SingleOrDefault();
            string value = JsonConvert.SerializeObject(customer, Formatting.Indented, new JsonSerializerSettings

            {

                ReferenceLoopHandling = ReferenceLoopHandling.Ignore

            });

            //   return Json(value, JsonRequestBehavior.AllowGet);

            return Json(customer);
                



        }
        [HttpPost]
        public JsonResult DeleteCustomer(int id)

        {
           
            Customer customer = databaseContext.Customer.Where(x => x.Id == id).SingleOrDefault();
            Sales sales = databaseContext.Sales.Where(x => x.CustomerId == id).FirstOrDefault();

            //if (sales != null)
            //{
            //    databaseContext.Sales.Remove(sales);
            //    databaseContext.SaveChanges();
            //}
            if (customer != null)
            {
                if (sales != null)
                {
                    databaseContext.Sales.Remove(sales);
                    databaseContext.SaveChanges();
                }

                databaseContext.Customer.Remove(customer);

                databaseContext.SaveChanges();
               
            }

            return Json(customer);
        }
    }
}

//public JsonResult Edit(Customer_ c)

//{



//    TalentEntities db = new TalentEntities();

//    Customer_ cust = db.Customer_.Where(x => x.Id == c.Id).SingleOrDefault();







//    cust.Name = c.Name;

//    cust.Address = c.Address;

//    db.SaveChanges();

//    return new JsonResult { Data = "Success", JsonRequestBehavior = JsonRequestBehavior.AllowGet };

