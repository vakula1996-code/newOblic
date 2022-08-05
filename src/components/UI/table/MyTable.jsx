import React from 'react';
import classes from './table.module.css'

const MyTable = () => {


    return (<div>
            <table style={{border: "solid black"}}>
                <thead>
                <tr>
                    <th>№</th>
                    <th>Назва</th>
                    <th>Назва</th>
                    <th>Назва</th>

                </tr>
                </thead>
                <tbody style={{border: "solid black"}}>
                <tr>
                    <td colSpan="4" style={{border: "solid black"}}>
                        <table>
                            <thead>
                                <tr>

                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>11</td>
                                    <td>12</td>

                                </tr>
                                {/*<tr>21</tr>*/}
                            </tbody>
                        </table>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>

    );
};

export default MyTable;