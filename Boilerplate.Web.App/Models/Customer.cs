namespace Boilerplate.Web.App.Models
{
    using System;
using System.Collections.Generic;


    public partial class Customer
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]

        public Customer()
        {
            this.Sales = new HashSet<Sales>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        //public object Sales { get; internal set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
       public virtual ICollection<Sales> Sales { get; set; }
    }
   
}
