export const knowledgeMapData = {
  nodes: [
    { id: "itsm", label: "IT Service Mgmt", category: "Core", size: 40 },
    { id: "change_mgmt", label: "Change Management", category: "Core", size: 30 },
    { id: "incident_mgmt", label: "Incident Management", category: "Core", size: 30 },
    { id: "problem_mgmt", label: "Problem Management", category: "Core", size: 20 },
    { id: "cab", label: "CAB Governance", category: "Management", size: 25 },
    
    { id: "infra", label: "Infrastructure", category: "Infra", size: 40 },
    { id: "windows", label: "Windows Server", category: "Infra", size: 30 },
    { id: "ad", label: "Active Directory", category: "Infra", size: 25 },
    { id: "dns_dhcp", label: "DNS / DHCP", category: "Infra", size: 20 },
    { id: "vmware", label: "VMware vSphere", category: "Infra", size: 30 },
    { id: "sccm", label: "SCCM Patching", category: "Infra", size: 25 },
    
    { id: "tools", label: "Enterprise Tools", category: "Tools", size: 35 },
    { id: "servicenow", label: "ServiceNow", category: "Tools", size: 25 },
    { id: "hpsm", label: "HPSM", category: "Tools", size: 25 },
    { id: "beyondtrust", label: "BeyondTrust PAM", category: "Tools", size: 20 }
  ],
  links: [
    // ITSM Connections
    { source: "itsm", target: "change_mgmt" },
    { source: "itsm", target: "incident_mgmt" },
    { source: "itsm", target: "problem_mgmt" },
    { source: "change_mgmt", target: "cab" },
    { source: "incident_mgmt", target: "problem_mgmt" },
    
    // Tools Connections
    { source: "tools", target: "servicenow" },
    { source: "tools", target: "hpsm" },
    { source: "itsm", target: "servicenow" },
    { source: "itsm", target: "hpsm" },
    
    // Infra Connections
    { source: "infra", target: "windows" },
    { source: "infra", target: "vmware" },
    { source: "windows", target: "ad" },
    { source: "windows", target: "dns_dhcp" },
    { source: "windows", target: "sccm" },
    { source: "windows", target: "beyondtrust" },
    
    // Cross-Domain Connections
    { source: "incident_mgmt", target: "windows" },
    { source: "change_mgmt", target: "sccm" }
  ]
};
