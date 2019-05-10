using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Boilerplate.Web.App.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Boilerplate.Web.App.Controllers
{
    public class SalesController : Controller
    {
        OnBoardTAskContext databaseContext = new OnBoardTAskContext();
        [HttpGet]
        public JsonResult GetSalesJson()
        {
            var salesList = databaseContext.Sales.Select(s => new
            {

                Id = s.Id,
                DateSold = s.DateSold,
                CustomerName = s.Customer.Name,
                ProductName = s.Product.Name,
                StoreName = s.Store.Name

            }).ToList();
            return Json(salesList);
        }
        [HttpGet]
        public JsonResult CustomerList()

        {
            var  Customerdata = databaseContext.Customer.Select(p => new {id = p.Id, name = p.Name }).ToList();
            //var Custdata = databaseContext.Customer.Select(p => new { name = p.Name }).ToList();

            return Json(Customerdata);
           

        }
        [HttpGet]
        public JsonResult ProductList()

        {



            var Productdata = databaseContext.Product.Select(p => new { id = p.Id, ProductName = p.Name }).ToList();



            return Json(Productdata);

        }
        [HttpGet]
        public JsonResult StoreList()

        {



            var Storedata = databaseContext.Store.Select(p => new { id = p.Id, StoreName = p.Name }).ToList();



            return Json(Storedata);

        }
        [HttpGet]
        public ActionResult Create()
        {
           
            return View();
        }
        [HttpPost]
        public ActionResult Create(Sales sales)
        {
            //if (ModelState.IsValid)
            //{

                databaseContext.Sales.Add(sales);
                databaseContext.SaveChanges();
                string value = JsonConvert.SerializeObject(sales, Formatting.Indented, new JsonSerializerSettings

                {

                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore

                });

            //}
            return View(sales);
        }

        [HttpGet]
        public JsonResult Edit(int id)
        {
            
            
                //var sales = db.Sales.SingleOrDefault(x => x.Id == id);

                Sales sales = databaseContext.Sales.Where(x => x.Id == id).SingleOrDefault();
            string value = JsonConvert.SerializeObject(sales, Formatting.Indented, new JsonSerializerSettings

            {

                ReferenceLoopHandling = ReferenceLoopHandling.Ignore

            });
            return Json(sales);
            

        }

        [HttpPost]
        public JsonResult Edit(Sales sales)

        {
           
            try
                 {
                Sales sale = databaseContext.Sales.Where(x => x.Id == sales.Id).SingleOrDefault();
                 sale.CustomerId = sales.CustomerId;
                sale.ProductId = sales.ProductId;
                sale.StoreId = sales.StoreId;
                sale.DateSold = sales.DateSold;
                databaseContext.SaveChanges();
            }
            catch (Exception e)
            {
                Console.Write(e.Data + "Exception Occured");
                return Json(sales);
            }
            return Json(sales);

        }









        [HttpPost]
        public JsonResult DeleteSale(int id)

        {
            var sales = databaseContext.Sales.Where(x => x.Id == id).SingleOrDefault();

            if (sales != null)

            {

                databaseContext.Sales.Remove(sales);

                databaseContext.SaveChanges();

            }
            return Json(sales);

        }
    }
}
