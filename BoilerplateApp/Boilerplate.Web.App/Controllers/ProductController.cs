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
    public class ProductController : Controller
    {
        OnBoardTAskContext databaseContext = new OnBoardTAskContext();
            // GET: Customer
            public JsonResult GetProductJson()
            {
                using (var databaseContext = new OnBoardTAskContext())
                {
                    return new JsonResult(databaseContext.Product.ToList());
                }
            }
        [HttpGet]
           public ActionResult Create()
        {
            return View();
        }
        [HttpPost]
        
            public JsonResult Create(Product product)
            {
                if (ModelState.IsValid)
                {

                    databaseContext.Product.Add(product);
                    databaseContext.SaveChanges();
                    return Json("Index");
                }
          
                return new JsonResult(product);
            }

            [HttpGet]
            public ActionResult Edit(int id)
            {
           Product product = databaseContext.Product.Where(x => x.Id == id).SingleOrDefault();

            string value = JsonConvert.SerializeObject(product, Formatting.Indented, new JsonSerializerSettings

            {

                ReferenceLoopHandling = ReferenceLoopHandling.Ignore

            });
            return Json(product);
        }
        //Post: /Product
        [HttpPost]
            public ActionResult Edit(Product product)
            {
                var Product = databaseContext.Product.FirstOrDefault(x => x.Id == product.Id);
                Product.Name = product.Name;
                Product.Price = product.Price;
                databaseContext.SaveChanges();
                return View(product);
            }

      public ActionResult Delete(int id)
            {
           Product product = databaseContext.Product.Where(x => x.Id == id).SingleOrDefault();


            string value = JsonConvert.SerializeObject(product, Formatting.Indented, new JsonSerializerSettings

            {

                ReferenceLoopHandling = ReferenceLoopHandling.Ignore

            });

            //   return Json(value, JsonRequestBehavior.AllowGet);

            return Json(product);

        }

        [HttpPost]
        public JsonResult DeleteProduct(int id)

        {

            Product product = databaseContext.Product.Where(x => x.Id == id).SingleOrDefault();
            Sales sales = databaseContext.Sales.Where(x => x.CustomerId == id).FirstOrDefault();

            //if (sales != null)
            //{
            //    databaseContext.Sales.Remove(sales);
            //    databaseContext.SaveChanges();
            //}
            if (product != null)
            {
                if (sales != null)
                {
                    databaseContext.Sales.Remove(sales);
                    databaseContext.SaveChanges();
                }

                databaseContext.Product.Remove(product);

                databaseContext.SaveChanges();

            }

            return Json(product);
        }
    }
}



    
