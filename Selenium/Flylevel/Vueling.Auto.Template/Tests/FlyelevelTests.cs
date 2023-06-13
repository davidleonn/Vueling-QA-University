using AventStack.ExtentReports;
using NUnit.Framework;
using Skysales.Auto.Auto.WebPages;
using System.Threading;

namespace Skysales.Auto.Auto.Template.Tests


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
            string month = "SEPTIEMBRE";

            flylevelHomePage.AcceptCookies();
            flylevelHomePage.DestiniesFlight(origenCity, destinyCity);
            flylevelHomePage.SelectMonth(month);

        } 
    }   
}
