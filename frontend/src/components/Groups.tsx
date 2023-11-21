import { useEffect, useState } from "react";
import Group from "../models/group.model";
import * as FinanceNetwork from '../network/finance.network';

const Groups = () => {

  const [groups, setGroups] = useState<Group[]>([])

  useEffect(() => {
    const getGroups = async () => {
      const grps = await FinanceNetwork.getUserGroups()
      setGroups(grps)
    }

    getGroups()
  }, [])

  return (
    <>

      {groups.length === 0 ? <h5>You are currently not part of any groups.</h5>
        :

        <>
          <h3>My groups</h3>
          <h6>
            {groups.map((group) => (JSON.stringify(group)))}
          </h6>
        </>

      }
    </>
  )
}

export default Groups