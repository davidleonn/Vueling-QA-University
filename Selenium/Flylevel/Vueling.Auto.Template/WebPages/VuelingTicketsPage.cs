using Skysales.Auto.Auto.Template.Common;
using Skysales.Auto.Auto.Template.SetUp;
using Skysales.Auto.Auto.Webpages.Base;
using OpenQA.Selenium;
using OpenQA.Selenium.Support.Events;
using OpenQA.Selenium.Support.UI;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Drawing;
using System.Threading;
using System.Web.Razor.Parser.SyntaxTree;

namespace Skysales.Auto.Auto.WebPages
{
    public class VuelingTicketsPage : CommonPage
    {
        public VuelingTicketsPage(ISetUpWebDriver setUpWebDriver) : base(setUpWebDriver)
        {

        }
        protected override IWebElement ApartadosBusqueda => throw new NotImplementedException();

        //Elements
        private IWebElement CookiesAccept
        {
            get { return WebDriver.FindElementById("onetrust-accept-btn-handler"); }
        }

        //marketDate1
        private IWebElement SelectOrigenDate
        {
            get { return WebDriver.FindElementById("marketDate1"); }
        }

        //private IWebElement SelectOrigenFlightDate
        //{
        //    get { return WebDriver.FindElementById("AvailabilitySearchInputSearchView_TextBoxMarketOrigin1DownArrowInput"); }
        //}

        //private IWebElement CalendarMonthNameText
        //{
        //    get { return WebDriver.FindElementByXPath("//td[@data-month='7']"); }
        //}

        private IWebElement SelectDepartureDate
        {
            get { return WebDriver.FindElementByXPath("(//span[@class='ui-datepicker-month'])[1]"); }
        }

        private IWebElement BtnNextMonth
        {
            get { return WebDriver.FindElementByXPath("//span[@class='ui-icon ui-icon-circle-triangle-e']"); }
        }


        private IWebElement DepartureDay
        {
            get { return WebDriver.FindElementByXPath("(//td[@data-month='7'])[1]"); }
        }

        private IWebElement btnLastAvailableDayByDay(int numberOfdays) => WebDriver.FindElementByXPath("(//td[@data-handler='selectDay'])[" + (numberOfdays - 1) + "]");

        //private IWebElement ReturnDay
        //{
        //    get { return WebDriver.FindElementByXPath("FindElementByXPath(//td[@data-month='7'])[2]);"); }
        //}


        private IWebElement RegisterText
        {
            get { return WebDriver.FindElementByCssSelector(".optionRegister"); }
        }

        private IWebElement BtnSubmiteRegister
        {
            get { return WebDriver.FindElementByXPath("//a[text()='Darme de alta']"); }
        }

        private IWebElement RegisterInputFirstName
        
        {
            get { return WebDriver.FindElementById("CONTROLGROUPREGISTERVIEW_PersonInputRegisterView_TextBoxFirstName"); }
        }

        private IWebElement RegisterInputLastName
        {
            get { return WebDriver.FindElementById("CONTROLGROUPREGISTERVIEW_PersonInputRegisterView_TextBoxLastName"); }
        }
        private IWebElement RegisterInputEmail
        {
            get { return WebDriver.FindElementById("CONTROLGROUPREGISTERVIEW_PersonInputRegisterView_TextBoxEmail"); }
        }
        private IWebElement RegisterInputPassword
        {
            get { return WebDriver.FindElementById("CONTROLGROUPREGISTERVIEW_MemberInputRegisterView_PasswordFieldAgentPassword"); }
        }

        private IWebElement RegisterInputPasswordConfirm
        {
            get { return WebDriver.FindElementById("CONTROLGROUPREGISTERVIEW_MemberInputRegisterView_PasswordFieldPasswordConfirm"); }
        }


        private IWebElement RegisterInputFirstQuestion(int number)
        {
            return WebDriver.FindElementById("CONTROLGROUPREGISTERVIEW_SecurityQuestionsRegisterView_FirstQuestion");
        }

        private IWebElement RegisterInputSecondQuestion(int number)
        {
            return WebDriver.FindElementById("CONTROLGROUPREGISTERVIEW_SecurityQuestionsRegisterView_SecondQuestion");
        }

        protected By CalendarDepartureDayText
        {
            get { return By.Id("datePickerTitleLabel"); }
        }

        protected IWebElement _CalendarDepartureDayText
        {
            get { return WebDriver.FindElement(CalendarDepartureDayText); }
        }

        protected By VuelingClubText
        {
            get { return By.Id("vy-header_main_login"); }
        }

        protected IWebElement _VuelingClubText
        {
            get { return WebDriver.FindElement(VuelingClubText); }
        }


        private IWebElement BtnOneWay
        {
            get { return WebDriver.FindElementByXPath("//span[text()='Solo ida']"); }
        }

        private IWebElement DepartureDateActive
        {
            get { return WebDriver.FindElementByXPath("(//td[@data-month='5'])[1]"); }
        }
        private IWebElement DepartureDateActive4
        {
            get { return WebDriver.FindElementByXPath("(//td[@data-month='5'])[5]"); }
        }
        private IWebElement OrigenInput
        { get { return WebDriver.FindElementByXPath("(//input[@title='Selección de Origen'])[1]"); } }
        private IWebElement DestinationInput
        { get { return WebDriver.FindElementByXPath("(//input[@title='Selección de Destino'])[1]"); } }

        private IWebElement CityOrigen
        { get
        {
                return WebDriver.FindElementByXPath("//a[@data-id-code='BCN']"); } 
        }            

        private IWebElement CityDestiny
        {
            get { return WebDriver.FindElementByXPath("//a[@data-id-code='MAD']"); }
        }
        
        private IWebElement SelectAdults { get { return WebDriver.FindElementById("DropDownListPassengerType_ADT_2"); } }
        private IWebElement SelectKids { get { return WebDriver.FindElementById("AvailabilitySearchInputSearchView_DropDownListPassengerType_CHD"); } }
        private IWebElement SelectBabies { get { return WebDriver.FindElementById("AvailabilitySearchInputSearchView_DropDownListPassengerType_INFANT"); } }


        //Llista elements de vols

        private IList<IWebElement> SearcherStationList
        {
            get { return (IList<IWebElement>)WebDriver.FindElementByCssSelector("#stationsList.optionActive"); }
        }
        

        private IWebElement BabiesSelect
        {
            get { return WebDriver.FindElementById("AvailabilitySearchInputSearchView_DropDownListPassengerType_INFANT"); }
        }

        private IWebElement BtnSearchFligth
        {
            get { return WebDriver.FindElementById("AvailabilitySearchInputSearchView_btnClickToSearchNormal"); }
        }


        //Functions
        
        public VuelingTicketsPage AcceptCookies()
        {
            CookiesAccept.Click();
            return this;
        }

        public VuelingTicketsPage SelectFlights()
        {
            OrigenInput.Click();
            CityOrigen.Click();
            DestinationInput.Click();
            CityDestiny.Click();
            return this;
        }        

        public VuelingTicketsPage SelectMonth(string month)
        {
            
            new WebDriverWait(WebDriver, TimeSpan.FromSeconds(WaitTimeout)).Until(CustomExpectedConditions.ElementIsVisible(CalendarDepartureDayText));                
            
            while (SelectDepartureDate.Text.ToUpper() != month.ToUpper())
            {
                BtnNextMonth.Click();
            }
            DepartureDay.Click();
            btnLastAvailableDayByDayQTY(2).Click();

            return this;
        }

        

        //public IWebElement NextDayAvailable()
        //{
        //    IWebElement nextAvailable = datepickerAvailable[1];
        //    return NextDayAvailable;
        //}

        public VuelingTicketsPage NavigateToRegister()
        {
            RegisterText.Click();
            BtnSubmiteRegister.Click();
            return this;
        }

        public VuelingTicketsPage FillAndSubmitRegisterForm()
        {
            string randomString = Helpers.GetRandomString(5);
            var randomNumber = Helpers.GetRandomNumberBetween(2,12);

            RegisterInputFirstName.SendKeys(randomString);
            RegisterInputLastName.SendKeys(randomString);
            RegisterInputEmail.SendKeys(randomString + "@test.es");            
            RegisterInputPassword.SendKeys("Dabidleon-56");
            RegisterInputPasswordConfirm.SendKeys("Dabidleon-56");
            RegisterInputFirstQuestion(randomNumber).Click();
            Thread.Sleep(10000);
            // RegisterInputSecondQuestion(number).Click();
            return this;
        }       

        public VuelingTicketsPage OWDestiniesFlight()
        {
            BtnOneWay.Click();
            OrigenInput.Click(); 
            CityOrigen.Click();            
            CityDestiny.Click();
            DepartureDateActive4.Click();
            BabiesSelect.SendKeys("1");
            BtnSearchFligth.Click();
            return this;
        }        

       
    }

}
