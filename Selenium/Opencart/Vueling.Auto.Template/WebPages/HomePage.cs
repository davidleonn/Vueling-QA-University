using AventStack.ExtentReports;
using NUnit.Framework;
using Opencart.Auto;
using System.Threading;
using Opencart.Auto.Webpages.Base;
using OpenQA.Selenium;
using Opencart.Auto.Template.SetUp;
using Opencart.Auto.Template.Common;
using OpenQA.Selenium.Support.UI;
using System;

namespace Opencart.Auto.Template.WebPages
{
    public class HomePage : CommonPage
    {
        public HomePage(ISetUpWebDriver setUpWebDriver) : base(setUpWebDriver)
        {
            
        }
        protected override IWebElement ApartadosBusqueda => throw new System.NotImplementedException();

        //Define WebElements by: Id, CssSelector or XPath

        private IWebElement BtnExpandDetails
        {
            get { return WebDriver.FindElementById("details-button"); }
        }
        private IWebElement BtnProceed
        {
            get { return WebDriver.FindElementById("proceed-link"); }
        }

        private IWebElement HomePageTitle
        { 
            get { return WebDriver.FindElementByXPath("//h1"); }
        }

        private IWebElement MyAccountDropDown
        {
            get { return WebDriver.FindElementByXPath("//span[text()='My Account']"); }

        }
        private IWebElement RegisterTextLink
        {
            get { return WebDriver.FindElementByXPath("//a[text()='Register']"); }
        }

        private IWebElement LoginLink
        {
            get { return WebDriver.FindElementByXPath("//a[text()='Login']"); }
        }

        private IWebElement ItemLink(string itemName)
        {
            return WebDriver.FindElementByXPath("//a[text()='"+ itemName +"']");
        }

        protected By FeaturedText
        {
            get { return By.XPath("//h3[text()='Featured']"); }
        }

        protected IWebElement _FeaturedText
        {
            get { return WebDriver.FindElement(FeaturedText); }
        }

        protected IWebElement GetCartItems
        {
            get { return WebDriver.FindElementById("cart-total"); }
        }

        protected IWebElement ComponentsDropdown
        {
            get { return WebDriver.FindElementByXPath("//a[text()='Components']"); }
        }


        protected IWebElement AllComponentsLink
        {
            get { return WebDriver.FindElementByXPath("//a[text()='Show All Components']"); }
        }


        private IWebElement altImage(string sponsorName)
        {
            return WebDriver.FindElementByXPath("//*[@id='carousel0']/div/div[5]/img[@alt='" + sponsorName + "']");
        }

        protected By GetLogoutText
        {
            get { return By.XPath("//a[text()='Logout']"); }
        }

        protected IWebElement _GetLogoutText
        {
            get { return WebDriver.FindElement(GetLogoutText); }
        }

        // Define functions and actions

        public HomePage WaitHomePage()
        {
            new WebDriverWait(WebDriver, TimeSpan.FromSeconds(WaitTimeout)).Until(CustomExpectedConditions.ElementIsVisible(FeaturedText));
            
            return this;
        }

        public HomePage WaitLogoutText()
        {
            MyAccountDropDown.Click();
            new WebDriverWait(WebDriver, TimeSpan.FromSeconds(WaitTimeout)).Until(CustomExpectedConditions.ElementIsVisible(GetLogoutText));

            return this;
        }

        public HomePage AssertNoItemsInCart()
        {
            string myItems = GetCartItems.Text;
            string itemsText = "0 item(s) - $0.00";

            Assert.AreEqual(myItems, itemsText);
            return this;
        }
        public HomePage SecurityPage()
        {
            BtnExpandDetails.Click();
            BtnProceed.Click();
            return this;
        }

        public HomePage HomePageTitleClick()
        {
            HomePageTitle.Click();
            return this;
        }

        public HomePage RegisterLink() 
        {
            MyAccountDropDown.Click();
            RegisterTextLink.Click();
            return this;
        }

        public HomePage ItemSelect(string name) 
        {
            ItemLink(name).Click();
            return this;
        }    
        
        public HomePage ComponentsTabNavigate()
        {
            ComponentsDropdown.Click();
            AllComponentsLink.Click();
            return this;
        }

        public HomePage FindSponsor(string sponsor)
        {
            if (altImage(sponsor) != null)
            {
                Console.WriteLine("El sponsor aparece");
            }
            else
            {
                Console.WriteLine("El sponsor no existe");
            }
            return this;
        }
    }
}
