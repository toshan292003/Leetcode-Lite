import {React,useState,useEffect} from "react";
import "./problems.css";
import Card from "./card";
export default function Problems(){
    const problems = [
        {
            problem: "Square of a Number",
            level: "Easy",
            description: {
              PS: [
                "Return the Square of a given number",
                "Square of a number is defined by the product of the number by itself",
              ],
              Examples: [
                {
                  Input: "a = 4",
                  Output: "16",
                  Explanation: "4 x 4 = 16",
                },
                {
                  Input: "a = 15",
                  Output: "225",
                  Explanation: "15 x 15 = 225",
                },
                {
                  Input: "a = 35",
                  Output: "1225",
                  Explanation: "35 x 35 = 1225",
                },
              ],
            },
            declaration: `#include<bits/stdc++.h>
            using namespace std;`,
            function: `int square(int a){
            
        }`,
            main: `int main()
        {
            int a[50] = {1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50};
            int ans[50] = {1,4,9,16,25,36,49,64,81,100,121,144,169,196,225,256,289,324,361,400,441,484,529,576,625,676,729,784,841,900,961,1024,1089,1156,1225,1296,1369,1444,1521,1600,1681,1764,1849,1936,2025,2116,2209,2304,2401,2500};
        
            for(int i=0;i<50;i++){
              int res = square(a[i]);
                if(res != ans[i]){
                    cout<<"Test cases passed : "<<i<<" / ";
                    cout<<"Given Input : "<<a[i]<<" / ";
                    cout<<"Expected Output : "<<ans[i]<<" / ";
                    cout<<"Your Output : "<<res;
                    return 0;
                }
            }
        
            cout<<"Passed";
            return 0;
        }`
        }
    ]
    
    return(
        <>
          <div className="problems">
            <div className="table">
              <span>Sl No.</span>
                <span>Problem Title</span>
                <span>Difficulty Level</span>
            </div>
            <Card problem={problems[0]} slno="1"></Card>
          </div>
        </>
    );
}