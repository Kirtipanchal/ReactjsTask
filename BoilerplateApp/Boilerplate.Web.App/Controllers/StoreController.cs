using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Boilerplate.Web.App.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Boilerplate.Web.App.Controllers
{
    public class StoreController : Controller
    {
        OnBoardTAskContext databaseContext = new OnBoardTAskContext();
        public JsonResult GetStoreJson()
        {

            return new JsonResult(databaseContext.Store.ToList());
        }
        [HttpGet]
        public ActionResult Create()
        {
            return View();
        }
        [HttpPost]
        public JsonResult Create (Store store)
        {
            if (ModelState.IsValid)
            {
                databaseContext.Store.Add(store);
                databaseContext.SaveChanges();
                return Json("Index");
            }
            return Json(store);
         }
       
        [HttpGet]
        public JsonResult Edit(int id)

        {
           
                    Store store = databaseContext.Store.FirstOrDefault(x => x.Id == id);
            string value = JsonConvert.SerializeObject(store, Formatting.Indented, new JsonSerializerSettings

            {

                ReferenceLoopHandling = ReferenceLoopHandling.Ignore

            });
            return Json(store);
        }
       [HttpPost]
       public JsonResult Edit(Store store)
            {
               var Store = databaseContext.Store.FirstOrDefault(x => x.Id == store.Id);
                Store.Name = store.Name;
               Store.Address = store.Address;
                databaseContext.SaveChanges();
                return Json(store);
            }

       
        public JsonResult GetDeleteStore(int id)
        {
            Store store = databaseContext.Store.Where(x => x.Id == id).SingleOrDefault();


            string value = JsonConvert.SerializeObject(store, Formatting.Indented, new JsonSerializerSettings

            {

                ReferenceLoopHandling = ReferenceLoopHandling.Ignore

            });

            //   return Json(value, JsonRequestBehavior.AllowGet);

            return Json(store);

        }
        [HttpPost]
        public JsonResult DeleteStore(int id)

        {

            Store store = databaseContext.Store.Where(x => x.Id == id).SingleOrDefault();
            Sales sales = databaseContext.Sales.Where(x => x.StoreId == id).FirstOrDefault();

           
            if (store != null)
            {
                if (sales != null)
                {
                    databaseContext.Sales.Remove(sales);
                    databaseContext.SaveChanges();
                }

                databaseContext.Store.Remove(store);

                databaseContext.SaveChanges();

            }

            return Json(store);
        }
    }

}
