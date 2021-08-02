using UnityEngine;
using System.Collections;
using TMPro;
using UnityEngine.UI;
using System;
using SimpleJSON;
using UnityEngine.Networking;

public class GetLogin : MonoBehaviour
{
    // [SerializeField] private TextMeshProUGUI TMP_myWeather;
    // [SerializeField] private Text normalText;
    // public Sprite Fair;
    // public Sprite FairNwarm;
    // public Sprite PartlyCloudyD;
    // public Sprite PartlyCloudyN;
    // public Sprite Cloudy;
    // public Sprite LightRain;
    // public Sprite ModerateRain;
    // public Sprite HeavyRain;
    // public Sprite Passingshower;
    // public Sprite Lightshower;
    // public Sprite Shower;
    // public Sprite HeavyShowers;
    // public Sprite ThunderyShowers;
    // public Sprite HeavyThunderyShowers;
    // public Sprite Default;
    // public Image imgTMP;
    // public Image img;

    public string url = "https://gamefps.herokuapp.com/";


    // Start is called before the first frame update
    void Start()
    {
        StartCoroutine(GetRequest(url));
    }

    IEnumerator GetRequest(string uri)
    {
        using (UnityWebRequest webRequest = UnityWebRequest.Get(uri))
        {
            // Request and wait for the desired page.
            yield return webRequest.SendWebRequest();

            string[] pages = uri.Split('/');
            int page = pages.Length - 1;

            if (webRequest.isNetworkError)
            {
                Debug.Log(pages[page] + ": Error: " + webRequest.error);
            }
            else
            {
                Debug.Log(pages[page] + ":\nReceived: " + webRequest.downloadHandler.text);
                parseJsonFile(webRequest.downloadHandler.text);
            }
        }
    }

    void parseJsonFile(string jsonData)
    {
        Debug.Log(jsonData);

        JSONObject GameJson = (JSONObject)JSON.Parse(jsonData);

        string forecast = GameJson["items"][0]["general"]["forecast"]; //index 11 for forecasts is Clementi

        TMP_myWeather.text = "forecast: " + forecast;
        normalText.text = "forecast: " + forecast;




        // switch (forecast)
        // {
        //     case "Fair":
        //         imgTMP.sprite = Fair;
        //         img.sprite = Fair;
        //         break;
        //     case "Fair & Warm":
        //         imgTMP.sprite = FairNwarm;
        //         img.sprite = FairNwarm;
        //         break;
        //     case "Partly Cloudy (Day)":
        //         imgTMP.sprite = PartlyCloudyD;
        //         img.sprite = PartlyCloudyD;
        //         break;
        //     case "Partly Cloudy (Night)":
        //         imgTMP.sprite = PartlyCloudyN;
        //         img.sprite = PartlyCloudyN;
        //         break;
        //     case "Cloudy":
        //         imgTMP.sprite = Cloudy;
        //         img.sprite = Cloudy;
        //         break;
        //     case "Light Rain":
        //         imgTMP.sprite = LightRain;
        //         img.sprite = LightRain;
        //         break;
        //     case "Moderate Rain":
        //         imgTMP.sprite = ModerateRain;
        //         img.sprite = ModerateRain;
        //         break;
        //     case "Heavy Rain":
        //         imgTMP.sprite = HeavyRain;
        //         img.sprite = HeavyRain;
        //         break;
        //     case "Passing Showers":
        //         imgTMP.sprite = Passingshower;
        //         img.sprite = Passingshower;
        //         break;
        //     case "Light Showers":
        //         imgTMP.sprite = Lightshower;
        //         img.sprite = Lightshower;
        //         break;
        //     case "Showers":
        //         imgTMP.sprite = Shower;
        //         img.sprite = Shower;
        //         break;
        //     case "Heavy Showers":
        //         imgTMP.sprite = HeavyShowers;
        //         img.sprite = HeavyShowers;
        //         break;
        //     case "Thundery Showers":
        //         imgTMP.sprite = ThunderyShowers;
        //         img.sprite = ThunderyShowers;
        //         break;
        //     case "Heavy Thundery Showers":
        //         imgTMP.sprite = HeavyThunderyShowers;
        //         img.sprite = HeavyThunderyShowers;
        //         break;
        //     default:
        //         imgTMP.sprite = Default;
        //         img.sprite = Default;
        //         break;

        // }


    }

}
