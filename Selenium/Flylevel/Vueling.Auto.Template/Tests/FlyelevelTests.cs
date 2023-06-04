using AventStack.ExtentReports;
using NUnit.Framework;
using Flylevel.Auto.WebPages;
using System.Threading;

namespace Flylevel.Auto.Template.Tests


{
    [TestFixture]
    class FlyelevelTests: TestSetCleanBase
    {
        [TestCase, Order(1)]

        public void SimpleFlightE2ETest()
        {
            flylevelHomePage = new FlylevelHomePage(setUpWebDriver);
            string origenCity = "Barcelona";
            string destinyCity = "Boston";
            string departureDay = "9";
            string returnday = "17";

            flylevelHomePage.AcceptCookies();
            flylevelHomePage.DestiniesFlight(origenCity, destinyCity);
            flylevelHomePage.AddTripDays(departureDay, returnday);

        }

        [TestCase, Order(2)]
        public void BarcelonaToSantiagoE2ETest()
        {
            flylevelHomePage = new FlylevelHomePage(setUpWebDriver);
            string origenCity = "Barcelona";
            string destinyCity = "Santiago de Chile";

            flylevelHomePage.AcceptCookies();
            flylevelHomePage.DestiniesFlight(origenCity, destinyCity);


        }

       



        //[TestCase, Order(3)]

        //public void BarcelonaToSantiagoE2ETest()
        //{
        //    flylevelHomePage = new FlylevelHomePage(setUpWebDriver);
        //    string origenCity = "Barcelona";
        //    string destinyCity = "Santiago de Chile";

        //    flylevelHomePage.DestiniesFlight(origenCity, destinyCity);
        //    flylevelHomePage.NextMonthClick();

        //}



    }   
}
