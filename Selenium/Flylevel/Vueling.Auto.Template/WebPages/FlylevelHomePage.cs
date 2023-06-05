using Flylevel.Auto.Template.SetUp;
using Flylevel.Auto.Webpages.Base;
using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;
using System;
using System.Collections;
using System.Threading;
using System.Web.Razor.Parser.SyntaxTree;

namespace Flylevel.Auto.WebPages
{
    public class FlylevelHomePage : CommonPage
    {

        //Constructor
        public FlylevelHomePage(ISetUpWebDriver setUpWebDriver) : base(setUpWebDriver)
        {
        }
        protected override IWebElement ApartadosBusqueda => throw new NotImplementedException();


        //Define WebElements by: Id, CssSelector or XPath

        //private IWebElement OrigenInput(string city)
        //{
        //     return WebDriver.FindElementByXPath("//div[@class='city' and text()='"+city+"']"); 
        //}

        //private IWebElement DestinyInput (string city) 
        //{
        //     return WebDriver.FindElementByXPath("//div[@class='city' and text()='" + city + "']");
        //}
        private IWebElement OrigenInput => WebDriver.FindElementByXPath("//div[@data-field='origin']");
        private IWebElement CityOrigen(string origenCity)
        {
           return WebDriver.FindElementByXPath("//div[@class='city' and text()='"+ origenCity + "']");
        }

        private IWebElement DestinyInput => WebDriver.FindElementByXPath("//div[@data-field='destination']");
        private IWebElement CityDestiny(string destinyCity)
        {
           return WebDriver.FindElementByXPath("//div[@data-field='destination']//div[@class='city' and text()='"+destinyCity+"']"); 
        }

        private IWebElement DateDepartureDay(string departureDay)
        {
            return WebDriver.FindElementByXPath("(//div[@class='day' and text()='" + departureDay + "'])[1]");
        }

        private IWebElement DateReturnDay(string returnDay)
        {
            return WebDriver.FindElementByXPath("(//div[@class='day' and text()='" + returnDay + "'])[1]");
        }

        
        //private IWebElement PassengersSelect
        //{
        //    get { return WebDriver.FindElementByCssSelector(".input-value"); }
        //}

        private IWebElement SearchButton
        {
            get { return WebDriver.FindElementById("searcher_submit_buttons"); }
        }

        private IWebElement CookiesButton
        {
            get { return WebDriver.FindElementById("ensCloseBanner"); }
        }

        
        private IWebElement DropdownTrip
        {
            get { return WebDriver.FindElementByXPath("//span[@class='dropdown-title-js' and text()='Ida y vuelta']"); }
        }

        private IWebElement OneWayTrip
        {
            get { return WebDriver.FindElementByCssSelector("#dropdown-trip > li:nth-child(2) > a"); }
        }

        private IWebElement CalendarMonthName
        {
            get { return WebDriver.FindElementByXPath("//div[@class='datepicker__month-title']/span[@class='month']"); }
        }
        

        private IWebElement FirstDayAvailableSeptember
        {
            get { return WebDriver.FindElementByXPath("((//div[@class='datepicker__months']/section[1]//div[@class='datepicker__day is-available '])[1])"); }
        }


        private IWebElement BtnNextMonth
        {
            get { return WebDriver.FindElementByXPath("//button[2]/span"); }
        }



        // Define functions and actions

        public FlylevelHomePage AcceptCookies()
        {
            CookiesButton.Click();
            return this;
        }

        public FlylevelHomePage DestiniesFlight(string origenCity, string destinyCity)
        {
            OrigenInput.Click();
            CityOrigen(origenCity).Click();
            DestinyInput.Click();
            CityDestiny(destinyCity).Click();           
            return this;
        }
        public FlylevelHomePage AddTripDays(string departureDay, string returnDay)
        {
            DateDepartureDay(departureDay).Click();
            DateReturnDay(returnDay).Click();
            SearchButton.Click();  
            return this;
        }

        public FlylevelHomePage DropdownOneWayClick()
        {
            DropdownTrip.Click();
            OneWayTrip.Click();

            return this;
        }

         public FlylevelHomePage SelectMonth(string month)
        {
            while (CalendarMonthName.Text != month.ToUpper())
            {
                BtnNextMonth.Click();
            }
            FirstDayAvailableSeptember.Click();

            string diaVuelta = FirstDayAvailableSeptember.Text;
            DateReturnDay(diaVuelta).Click();
            return this;
        }

    }
}
