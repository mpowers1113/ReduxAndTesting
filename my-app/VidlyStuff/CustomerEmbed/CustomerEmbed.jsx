import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { trackPromise } from 'react-promise-tracker';

import { isMobile } from 'react-device-detect';
import axios from '../../../axios';
import { TEST_IMAGE_BASE64 } from '../../../testImage';
import { smallLogo64 } from '../../../small_logo_base64';
import { Portal } from 'react-portal';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router';

function CustomerEmbed(props) {
  // const creatorUsername = urlParamsToObj(useLocation().search).creator;
  const [splitPackages, setSplitPackages] = useState(false);

  const FIRST = 'first';
  const SECOND = 'second';

  const params = useParams();
  let history = useHistory();

  const getCreatorInfo = () => {
    trackPromise(
      axios
        .get(`/u/${params.username}`)
        .then(function (resp) {
          props.setItem('profilePictureURI', resp.data.profile_pic_url);
          props.setItem('creatorUsername', resp.data.instagram_username);
          props.setItem('creatorId', resp.data.user_id);
          props.setItem(
            'creatorFullname',
            resp.data.firstname + ' ' + resp.data.lastname,
          );
          props.setItem('jobTitle', resp.data.bio);
          props.setPackagesOffered(resp.data.packages);
        })
        .catch(function (error) {
          console.error(error);
        })
        .then(function (r) {}),
      'center-screen',
    );
  };

  useEffect(() => {
    if (!props.creatorUsername) {
      getCreatorInfo();
    }
  }, []);

  const packageSelectClickHandler = (e) => {
    const targetId = e.target.closest('div').id;
    if (splitPackages) {
      document
        .querySelectorAll('.split-packages-price-box')
        .forEach(
          (node) =>
            node.classList.contains('price-box-selected') &&
            node.classList.remove('price-box-selected'),
        );
    } else {
      document
        .querySelectorAll('.price-box')
        .forEach(
          (node) =>
            node.classList.contains('price-box-selected') &&
            node.classList.remove('price-box-selected'),
        );
    }
    e.target.closest('div').classList.add('price-box-selected');

    const [selected] = props.packagesOffered.filter(
      (item) => item.package_id === Number(targetId),
    );
    props.setItem('selectedPackageId', selected.package_id);
  };

  const bookMeetingClickHandler = () => {
    if (props.selectedPackageId) history.push('/customer/date');
  };

  const navigateToCreatorProfileHandler = () => {
    history.push(`/${params.username}`);
  };

  const firstSetOfPackages = [];
  const secondSetOfPackages = [];

  const generatePackageSets = (packages) => {
    let count = 0;
    let target = 'first';

    const packagesCopy = [...packages];

    function recursiveShift(packagesCopy) {
      if (packagesCopy.length <= 0) {
        return;
      }
      const targetArr =
        target === 'first' ? firstSetOfPackages : secondSetOfPackages;
      const shiftedOff = packagesCopy.shift();
      targetArr.push(shiftedOff);
      count++;
      if (count >= 3) {
        count = 0;
        target = 'second';
      }
      return recursiveShift(packagesCopy);
    }
    recursiveShift(packagesCopy);
    setSplitPackages({
      first: firstSetOfPackages,
      second: secondSetOfPackages,
    });
  };

  useEffect(() => {
    if (props.packagesOffered) {
      if (props.packagesOffered.length > 3) {
        generatePackageSets(props.packagesOffered);
      }
    }
  }, [props.packagesOffered]);

  const renderPackagesToggle = () => {
    if (splitPackages) {
      return (
        <>
          <div className="split-packages-wrapper">
            {splitPackages &&
              splitPackages[FIRST].map(({ package_id, price, minutes }) => {
                return (
                  <>
                    <div
                      key={package_id}
                      id={package_id}
                      className="split-packages-price-box"
                      onClick={packageSelectClickHandler}>
                      <p className="price-box-minutes">{minutes} Min</p>
                      <p style={{ margin: '0', padding: '0' }}>${price}</p>
                    </div>
                  </>
                );
              })}
          </div>
          <div className="split-packages-wrapper">
            {splitPackages &&
              splitPackages[SECOND].map(({ package_id, price, minutes }) => {
                return (
                  <>
                    <div
                      key={package_id}
                      id={package_id}
                      className="split-packages-price-box"
                      onClick={packageSelectClickHandler}>
                      <p className="price-box-minutes">{minutes} Min</p>
                      <p style={{ margin: '0', padding: '0' }}>${price}</p>
                    </div>
                  </>
                );
              })}
          </div>
        </>
      );
    } else {
      return (
        <div className="packages-wrapper">
          {props.packagesOffered.map(({ package_id, price, minutes }) => {
            return (
              <>
                <div
                  onClick={(e) => packageSelectClickHandler(e)}
                  id={package_id}
                  key={package_id}
                  className="price-box">
                  <p className="price-box-minutes">{minutes} min</p>
                  <p style={{ margin: '0', padding: '0' }}>${price}</p>
                </div>
              </>
            );
          })}
        </div>
      );
    }
  };

  return (
    <>
      {' '}
      <Portal node={document & document.querySelector('#embed')}>
        <style type="text/css">
          {`
        

        .split-button-color-beacon {
          background-color: #f50163;
          color: white;
          width: 100%;
          min-height: 3rem;
          max-height: 3rem;
          border-radius: 8px;
          font-size: 1.4rem;
          font-weight: bold;
          border: none;
          font-family: Roboto;
          transition: background-color 0.5s ease;
          cursor: pointer;
        }

        .button-color-beacon {
          background-color: #f50163;
          color: white;
          width: 100%;
          min-height: 3.5rem;
          border-radius: 8px;
          font-size: 1.4rem;
          font-weight: bold;
          border: none;
          font-family: Roboto;
          transition: background-color 0.5s ease;
          cursor: pointer;
        }

        .split-button-beacon-wrapper {
          margin: .75rem .25rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .button-beacon-wrapper {
          margin: 1.3rem .25rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .split-button-color-beacon:hover {
          background-color: #4227bf;

        }
        .button-color-beacon:hover{
          background-color: #4227bf;
        }
       
        .price-box {
          background-color: white;
          width: 100px;
          height: auto;
          flex-direction: column;
          color: black;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: .5rem .3rem;
          border: 2px solid black;
          border-radius: .5rem;
          cursor: pointer;
          transition: background-color 0.5s ease;
          margin: .3rem;
        }

        .split-packages-price-box {
          background-color: white;
          width: 80px;
          height: auto;
          flex-direction: column;
          color: black;
          display: flex;
          flex-grow: 1;
          justify-content: center;
          align-items: center;
          padding: .4rem .2rem;
          border: 2px solid black;
          border-radius: .5rem;
          cursor: pointer;
          transition: background-color 0.5s ease;
          margin: .2rem;
        }

        .price-box:hover {
            background-color: black;
            color: white;
        }

        .split-packages-price-box:hover {
          background-color: black;
          color: white;
        }

        .price-box-selected {
          background-color: black;
          color:white;
        }

        .price-box-minutes {
          margin: 0;
          padding: 0;
          font-weight: 900;
          font-size: 1.3rem;
          font-family: Roboto;
        }

        .price-box-selected {
            background-color: black;
            color: white;     
        }
    
        .split-max-width-beacon {
          min-width: 375px;
          max-width: 400px;
          diplay:flex;
          justify-content: center;
          align-items: center;            
          height: 375px;
          background-color: white;
          border-radius: 2rem;
          padding: 1rem 1.5rem;
        }
        .desktop-container {
          width: 600px;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: white;
          border-radius: 2rem;
        }
        .max-width-beacon {
          min-width: 375px;
          max-width: 400px;
          diplay:flex;
          justify-content: center;
          align-items: center;            
          height: 333px;
          background-color: white;
          border-radius: 2rem;
          padding: 1rem 1.5rem;
        }
        .container-beacon {
          min-width: 375px;
          margin: 0 auto;
          background-color: #fffff;
          width: 100%;
          max-width: 600px;
          height: 310px;
          border-radius: 28px;
          transition: all .4 ease;   
        }
        .sub-container-beacon {
          margin-bottom: 1rem;
        }
        .header-beacon {
          display: flex;
          align-items: center;
          justify-content: start;
        }
        .header-full-name {
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin-left: 1rem;
        }
        .header-full-name h3 {
            margin: 0;
            padding: 0;
            font-weight: 600;
            font-family: Roboto;
        }
        .header-full-name h5 {
          margin: 0;
          padding: 0;
          font-family: Inter;
        }

        .packages-wrapper {
          margin: 1rem 0;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
        }

        .split-packages-wrapper {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
        }
       
        .footer-beacon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .signup-link {
          font-family: Roboto;
        }
        `}
        </style>

        <div className={isMobile ? '' : 'desktop-container'}>
          <div
            className={
              splitPackages ? 'split-max-width-beacon' : 'max-width-beacon'
            }>
            <div className="sub-container-beacon">
              <div className="header-beacon">
                <div>
                  <img
                    src={TEST_IMAGE_BASE64}
                    onClick={navigateToCreatorProfileHandler}
                    style={{
                      height: '80px',
                      width: '80px',
                      cursor: 'pointer',
                    }}
                    alt="avatar"
                  />
                </div>
                <div>
                  <div className="header-full-name">
                    <a
                      href={`${process.env.REACT_APP_FE_URI}?utm_source=bookvid&utm_medium=customerstart&utm_campaign=${params.username}`}>
                      <h3
                        onClick={navigateToCreatorProfileHandler}
                        style={{
                          margin: '0',
                          padding: '0',
                          cursor: 'pointer',
                        }}>
                        {props.creatorFullname}
                      </h3>
                    </a>
                    <h5>{props.jobTitle}</h5>
                  </div>
                </div>
              </div>
            </div>
            {renderPackagesToggle()}
            <div
              className={
                splitPackages
                  ? 'split-button-beacon-wrapper'
                  : 'button-beacon-wrapper'
              }>
              <button
                onClick={bookMeetingClickHandler}
                disabled={!props.selectedPackageId}
                className={
                  splitPackages
                    ? 'split-button-color-beacon'
                    : 'button-color-beacon'
                }>
                Book Meeting
              </button>
            </div>
            <div className="footer-beacon-wrapper">
              <a
                className="signup-link"
                style={{
                  margin: '0',
                  padding: '0',
                  fontFamily: 'Roboto',
                  fontSize: '15px',
                  fontWeight: '600',
                }}
                href={`${process.env.REACT_APP_FE_URI}?utm_source=bookvid&utm_medium=customerstart&utm_campaign=${params.username}`}>
                Powered by{' '}
                {
                  <img
                    style={{
                      height: '15px',
                      margin: '0',
                      padding: '0',
                      marginLeft: '.5rem',
                    }}
                    src={smallLogo64}
                    alt="logo"
                  />
                }
                <span
                  style={{
                    fontSize: '11px',
                    marginLeft: '.25rem',
                    fontWeight: 'bold',
                  }}>
                  Bookvid
                </span>
              </a>
            </div>
          </div>
        </div>
      </Portal>
    </>
  );
}

const mapStateToProps = ({ customerReducer }) => {
  return {
    jobTitle: customerReducer.jobTitle,
    creatorUsername: customerReducer.creatorUsername,
    profilePictureURI: customerReducer.profilePictureURI,
    creatorFullname: customerReducer.creatorFullname,
    packagesOffered: customerReducer.packagesOffered,
    packagesLoaded: customerReducer.packagesLoaded,
    selectedPackageId: customerReducer.selectedPackageId,
  };
};

// Which kind of actions do I want to dispatch from this Component
const mapDispatchToProps = (dispatch) => {
  return {
    setItem: (key, value) =>
      dispatch({ type: 'SET_ITEM', key: key, value: value }),
    setPackagesOffered: (packagesOffered) =>
      dispatch({
        type: 'SET_PACKAGES_OFFERED',
        packagesOffered: packagesOffered,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerEmbed);

//FOR FINAL PRODUCTION, REPLACE THIS for the User Profile Pic
// src={`${props.profilePictureURI}?cache=${getRandomInt(1, 1000)}`}

// let instaPicStyle = {
//   display: 'flex',
//   justifyContent: 'center',
//   height: '150px',
//   visibility: 'hidden',
// };

// if (
//   props.profilePictureURI &&
//   process.env.REACT_APP_SHOW_INSTA_PIC === 'true'
// ) {
//   instaPicStyle = {
//     display: 'flex',
//     justifyContent: 'center',
//     height: '150px',
//   };
// }
