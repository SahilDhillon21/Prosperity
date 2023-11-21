import { useEffect, useState } from "react"
import Group from "../models/group.model"
import * as FinanceNetwork from '../network/finance.network'
import { CiSquarePlus } from "react-icons/ci";

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
      <h3>Groups
        <CiSquarePlus className="my-auto cursor-pointer" onClick={() => { }} />
      </h3>

      {groups.length === 0 ? <h5>You are currently not part of any groups.</h5>
        :
        
        <h3>My groups</h3>
        
      }
    </>
  )
}

export default Groups