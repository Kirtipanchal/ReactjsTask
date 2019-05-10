
namespace Boilerplate.Web.App.Models
{
    using System;
using System.Collections.Generic;


    public partial class Product
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Product()

        {
            
            this.Sales= new HashSet<Sales>();

        }
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Sales> Sales { get; set; }
    }
}
