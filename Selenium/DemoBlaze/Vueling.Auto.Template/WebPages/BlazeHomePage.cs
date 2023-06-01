using DemoBlaze.Auto.Template.Common;
using DemoBlaze.Auto.Template.SetUp;
using DemoBlaze.Auto.Webpages.Base;
using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;
using System;
using System.Collections;

namespace DemoBlaze.Auto.WebPages
{
    public class BlazeHomePage : CommonPage
    {
        //Constructor
        public BlazeHomePage(ISetUpWebDriver setUpWebDriver) : base(setUpWebDriver)
        {

        }
        protected override IWebElement ApartadosBusqueda => throw new System.NotImplementedException();

        //Define WebElements by: Id, CssSelector or XPath

        private IWebElement SearchHome
        {
            get { return WebDriver.FindElementByXPath("//a [text()= 'Home '] "); }
        }
        private IWebElement Login
        {
            get { return WebDriver.FindElementById("login2"); }
        }        
                
        protected By NameOfUser
        {
            get { return By.Id("nameofuser"); }
        }

        protected IWebElement _NameOfUser
        {
            get { return WebDriver.FindElement(NameOfUser); }
        }

        private IWebElement LinkLaptops
        {
            get { return WebDriver.FindElementByXPath("//a[text()= 'Laptops'] "); }
        }

        private IWebElement FindCategory(String category)
        {
            return WebDriver.FindElementByXPath("//a[text()='" + category + "'] ");
        }

        private IWebElement FindItem(String itemName)
        {
             return WebDriver.FindElementByXPath("//a[text()='" + itemName + "'] "); 
        }
            
        protected By HomeWait
        {
            get { return By.XPath("//a[text()='CATEGORIES']"); }
        }

        protected IWebElement _HomeWait
        {
            get { return WebDriver.FindElement(HomeWait); }
        }
        
        // Define functions and actions

        public BlazeHomePage HomePage()
        {
            SearchHome.Click();
            return this;
        }

        public BlazeHomePage ClickLogin()
        {
            Login.Click();
            return this;
        }       

        public BlazeHomePage WaitNameOfUser()
        {
            new WebDriverWait(WebDriver, TimeSpan.FromSeconds(WaitTimeout)).Until(CustomExpectedConditions.ElementIsVisible(NameOfUser));
            return this;
        }

        public BlazeHomePage ClickLaptops() 
        {
            LinkLaptops.Click();
            return this;
        }

        public BlazeHomePage ClickCategoryAndItem(String category, String name)
        {
            FindCategory(category).Click();
            FindItem(name).Click();
            return this;
        }
        
        public BlazeHomePage WaitHomePage()
        {
            new WebDriverWait(WebDriver, TimeSpan.FromSeconds(WaitTimeout)).Until(CustomExpectedConditions.ElementIsVisible(HomeWait));
            return this;
        }
    }
}
