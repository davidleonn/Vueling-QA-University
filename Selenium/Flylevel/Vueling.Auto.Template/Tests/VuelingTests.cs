using AventStack.ExtentReports;
using NUnit.Framework;
using Skysales.Auto.Auto.WebPages;
using System.Threading;

namespace Skysales.Auto.Auto.Template.Tests

{
    [TestFixture]
    class VuelingTests : TestSetCleanBase
    {
        [TestCase, Order(1)]

        public void BcnToMadAugustTest()
        {
            vuelingTicketsPage = new VuelingTicketsPage(setUpWebDriver);
            

            string month = "agosto";

            vuelingTicketsPage.AcceptCookies();
            vuelingTicketsPage.SelectFlights();            
            vuelingTicketsPage.SelectMonth(month);
        }

        [TestCase, Order(2)]
        public void RegisterWithRandomFieldsTest()
        {
            vuelingTicketsPage = new VuelingTicketsPage(setUpWebDriver);

            vuelingTicketsPage.AcceptCookies();
            vuelingTicketsPage.NavigateToRegister();
            vuelingTicketsPage.FillAndSubmitRegisterForm();
        }

        [TestCase, Order(3)]

        public void CheapestOWBcnMadFlightTest()
        {
            vuelingTicketsPage = new VuelingTicketsPage(setUpWebDriver);            

            vuelingTicketsPage.AcceptCookies();
            vuelingTicketsPage.OWDestiniesFlight();            
            

        }
    }
}