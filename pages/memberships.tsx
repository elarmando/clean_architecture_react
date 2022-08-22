import { useEffect, useState } from "react";
import Layout from '../component/layout';
import { NextPageWithLayout } from "./_app";
import PanelMembeship from "../component/membership/ui/panelMembership";

const Memberships: NextPageWithLayout = ()=>{
    return <PanelMembeship></PanelMembeship>
}

Memberships.getLayout = Layout;

export default Memberships;
