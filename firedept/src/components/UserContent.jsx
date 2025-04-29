import React from "react";
import sprinkler from "../assets/sprinkler.jpg";
import smokealert from "../assets/smokealarm.jpg";
import extinguisher from "../assets/Extinguisher.jpg";
import coalarm from '../assets/COalarm.jpg'

const UserContent = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12 d-flex flex-column flex-md-row gap-4 align-items-start p-3 rounded  shadow-sm">
            <div className="flex-grow-1">
              <h3 className="fw-bold mt-4">Smoke Alarms</h3>
              <p className="text-muted">
                Smoke alarms are essential safety devices that detect smoke
                early and provide crucial warnings to occupants. They are the
                first line of defense in preventing fire-related injuries and
                deaths.
              </p>

              <ul>
                <li className="m-2">
                  {" "}
                  Install smoke alarms in every bedroom, outside each sleeping
                  area,brand on every level of the home.
                </li>
                <li className="m-2">
                  {" "}
                  Test alarms monthly, replace batteries every 6 months, and
                  replace the entire unit every 10 years.
                </li>
                <li className="m-2">
                  Ionization alarms are quicker at detecting flaming fires,
                  while photoelectric alarms are better at sensing smoldering
                  fires.
                </li>
                <li className="m-2">
                  When one alarm sounds, they all sound — giving you more time
                  to escape.
                </li>
              </ul>

              <div className="alert alert-warning mt-4" role="alert">
                Never disable a smoke alarm — even temporarily. Early detection
                saves lives!
              </div>
            </div>
            <div className="flex-shrink-0 mt-5">
              <img
                src={smokealert}
                alt="Smoke Alarm"
                className="img-fluid rounded"
                style={{ maxWidth: "200px", marginTop:'8px',height: "17rem" }}
              />
            </div>
          </div>
          <div className="col-lg-12 d-flex flex-column flex-md-row gap-4 mt-2 align-items-start p-3 rounded  shadow-sm">
            <div className="flex-grow-1">
              <h3 className="fw-bold mt-4">Fire Extinguisher</h3>
              <p className="text-muted">
                A fire extinguisher is a portable device that discharges a jet
                of gas, foam, water, or dry powder to extinguish small fires in
                emergency situations. They can prevent a small fire from turning
                into a disaster. When used correctly, a fire extinguisher can
                control or put out fires before they spread.
              </p>

              <ul>
                <li className="m-2">
                Water-Based - For paper, wood, and fabric fires. 
                </li>
                <li className="m-2">
                Foam - Ideal for flammable liquids like petrol or paint.
                </li>
                <li className="m-2">
                CO₂ - Best for electrical fires
                </li>
                <li className="m-2">
                Dry Powder  Multipurpose use on solids, liquids, and gases
                </li>
                <li className="m-2">
                Wet Chemical - For kitchen fires involving oils and fats
                </li>
              </ul>

              <div className="alert alert-warning mt-4" role="alert">
              An expired or obstructed extinguisher can put lives and property at serious risk during an emergency.
              </div>
            </div>
            <div className="flex-shrink-0 mt-5">
              <img
                src={extinguisher}
                alt="Fire Extinguisher"
                className="img-fluid rounded"
                style={{ maxWidth: "180px", height: "20rem",marginTop:'15px' }}
              />
            </div>
          </div>
          <div className="col-lg-12 d-flex flex-column flex-md-row gap-4 mt-2 align-items-start p-3 rounded  shadow-sm">
            <div className="flex-grow-1">
              <h3 className="fw-bold mt-4">Fire Sprinkler</h3>
              <p className="text-muted">
              Fire sprinklers are life-saving devices designed to detect and control fires automatically.
               They activate when high heat is detected, releasing water directly over the fire source.
              </p>

              <ul>
                <li className="m-2">
                Each sprinkler head activates individually when the surrounding temperature exceeds a preset limit (usually around 155°F / 68°C).
                </li>
                <li className="m-2">
                Water is released only where it's needed, minimizing damage and conserving water.
              </li>
                <li className="m-2">
                Sprinklers respond within seconds, helping control the fire before it spreads.                  </li>
                <li className="m-2">
                  Each sprinkler system is designed to cover a specific area, ensuring maximum efficiency and safety.
                </li>
              </ul>

              <div className="alert alert-warning mt-4" role="alert">
              Ensure all sprinkler heads are clean, undamaged, and not blocked by furniture or decorations.
             </div>
            </div>
            <div className="flex-shrink-0 mt-5">
              <img
                src={sprinkler}
                alt="Sprinkler"
                className="img-fluid rounded"
                style={{ maxWidth: "180px", height: "17rem",marginTop:'12px' }}
              />
            </div>
          </div>
          <div className="col-lg-12 d-flex flex-column flex-md-row gap-4 mt-2 align-items-start p-3 rounded  shadow-sm">
            <div className="flex-grow-1">
              <h3 className="fw-bold mt-4">Carbon monoxide alarm</h3>
              <p className="text-muted">
              Carbon monoxide (CO) is a colorless, odorless, and deadly gas produced by burning fuel.
               A carbon monoxide alarm detects this gas and warns you before it reaches dangerous levels.
              </p>

              <ul>
                <li className="m-2">
                Place at least one CO alarm on every floor of your home or building.
Install near sleeping areas, kitchens, and attached garages.
Avoid placing them near windows, doors, or vents.

                </li>
                <li className="m-2">
                Fires can produce high levels of CO, especially in enclosed spaces.
Malfunctioning heaters, fireplaces, or generators can leak CO without any visible signs.
              </li>
                <li className="m-2">
                Never ignore a CO alarm – evacuate immediately and seek fresh air.
                </li>
                <li className="m-2">
                Test Monthly • Replace Batteries Every 6 Months • Replace Device Every 5-7 Years
                                </li>
              </ul>

              <div className="alert alert-warning mt-4" role="alert">
              Carbon monoxide has no smell, no taste, and no color — only an alarm can warn you. Protect your space today.             </div>
            </div>
            <div className="flex-shrink-0 mt-5">
              <img
                src={coalarm}
                alt="CO alarm"
                className="img-fluid rounded"
                style={{ maxWidth: "180px", height: "20rem",marginTop:'12px' }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserContent;
