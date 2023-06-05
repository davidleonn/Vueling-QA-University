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
using Opencart.Auto.Template.WebPages;

namespace Opencart.Auto.Template.WebPagess
{
    public class AllProductsTabPage : CommonPage
    {
        public AllProductsTabPage(ISetUpWebDriver setUpWebDriver) : base(setUpWebDriver)
        {

        }
        protected override IWebElement ApartadosBusqueda => throw new NotImplementedException();

        //Define WebElements by: Id, CssSelector or XPath

        protected By LeftTabDesktopsText
        {
            get { return By.XPath("//aside[@id='column-left']//a[text()='Desktops (13)']"); }
        }

        protected IWebElement _LeftTabDesktopsText
        {
            get { return WebDriver.FindElement(LeftTabDesktopsText); }
        }

        protected IWebElement  MonitorsText
        {
            get { return WebDriver.FindElementByXPath("//div[@id='content']//a[text()='Monitors (2)']"); }
        }

        protected IWebElement SelectItem(string itemName)
        {
            return WebDriver.FindElementByXPath("//a[text()='" + itemName + "']");
        }


        // Define functions and actions

        public AllProductsTabPage WaitAndClickMonitors()
        {
            new WebDriverWait(WebDriver, TimeSpan.FromSeconds(WaitTimeout)).Until(CustomExpectedConditions.ElementIsVisible(LeftTabDesktopsText));
            MonitorsText.Click();
            

            return this;
        }

        public AllProductsTabPage SelectMonitor(string name)
        {
            SelectItem(name).Click();
            return this;
        }

    }
}
