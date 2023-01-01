import React, { useEffect } from "react";
import { fetchRequestDetail } from "../features/requestSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { updateRequestDetail } from "../features/requestSlice";

const RequestDetail = () => {
  const CxtData = useContext(AuthContext);
  const dispatch = useDispatch();
  const requestState = useSelector((state) => state.request);
  const { requestLoading, request, requestMessage } = requestState;
  const params = useParams();

  useEffect(() => {
    dispatch(fetchRequestDetail({ id: params.id, token: CxtData.auth.access }));
  }, []);

  return (
    <main className="container look-for left-border-box">
      <div className="main-box">
        <h2>Request Details</h2>
        {requestLoading ? (
          "Loading"
        ) : (
          <>
            <h3>
              Blood Requested:{" "}
              {request.blood_donor && request.blood_donor["blood_group"]}
            </h3>
            <hr />
            <table>
              <caption>Blood Requested By:</caption>
              <tbody>
                <tr>
                  <th>Name: </th>
                  <td>{request.ba_full_name}</td>
                </tr>
                <tr>
                  <th>Phone: </th>
                  <td>{request.blood_asker && request.blood_asker["phone"]}</td>
                </tr>
              </tbody>
            </table>
            <table>
              <caption> Blood Requested To:</caption>
              <tbody>
                <tr>
                  <th>Name: </th>
                  <td>{request.bd_full_name}</td>
                </tr>
                <tr>
                  <th>Phone: </th>
                  <td>{request.blood_donor && request.blood_donor["phone"]}</td>
                </tr>
                <tr>
                  <th>Address: </th>
                  <td>
                    {request.blood_donor && request.blood_donor["district"]}
                  </td>
                </tr>
                <tr>
                  <th>Blood Group: </th>
                  <td>
                    {request.blood_donor && request.blood_donor["blood_group"]}
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="req-details-btn flex">
              <button
                className={request.donation_status ? "btn-disabled" : ""}
                disabled={request.donation_status && true}
                onClick={() => {
                  dispatch(
                    updateRequestDetail({
                      type: "donation_status",
                      token: CxtData.auth.access,
                      id: params.id,
                    })
                  );
                }}
              >
                Wants to donate to donate
              </button>
              <span>
                Cancel the request:{" "}
                <button
                  disabled={request.cancel_status && true}
                  onClick={() => {
                    dispatch(
                      updateRequestDetail({
                        type: "cancel_status",
                        token: CxtData.auth.access,
                        id: params.id,
                      })
                    );
                  }}
                >
                  Cancel
                </button>
              </span>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default RequestDetail;
