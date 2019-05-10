
namespace Boilerplate.Web.App.Models
{
    using System;
using System.Collections.Generic;


    public partial class Sales
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int StoreId { get; set; }
        public System.DateTime DateSold { get; set; }
        public int CustomerId { get; set; }

        public virtual Customer Customer { get; set; }
        public virtual Product Product { get; set; }
        public virtual Store Store { get; set; }
    }
}
