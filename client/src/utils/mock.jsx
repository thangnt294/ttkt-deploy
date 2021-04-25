import avatar from 'assets/images/avatar.png';
import ooclLogo from 'assets/images/vessel-logos/oocl.png';
import mitsuicoLogo from 'assets/images/vessel-logos/mitsuico.png';
import maersklineLogo from 'assets/images/vessel-logos/maerskline.png';
import cmaLogo from 'assets/images/vessel-logos/cma.png';
import coscoLogo from 'assets/images/vessel-logos/cosco.png';
import {
  TEAMS_URL,
  TEAM_DETAILS_URL,
  PERSONAL_SETTINGS_URL,
  ORGANIZATIONS_URL,
  TEMPLATES_URL,
  TRACK_SHIPMENT_URL,
  VESSEL_SCHEDULE_URL,
  BOOKING_REQUEST_URL,
  ACTIVE_SHIPMENTS_URL,
  ALL_ISSUES_URL,
  ARCHIVE_URL,
  ORGANIZATIONS_DETAILS_URL,
  TEMPLATE_DETAILS_URL,
  OTHER_TEMPLATES_URL,
  OTHER_TEMPLATE_DETAILS_URL,
  ACTIVE_SHIPMENT_DETAILS_URL,
  VESSEL_SCHEDULE_RESULTS_URL,
  ARCHIVE_DETAILS_URL,
  ADD_NEW_REQUEST_URL,
  LOGIN_URL,
  CHANGE_PASSWORD_URL,
  DEPARTURE,
  ARRIVAL,
  SHIPMENT_DETAILS,
  SHIPMENT_STATUS, ALL_TEAMS_URL, TASKS_URL
} from 'actions';
import { random } from 'lodash'

export const sampleOptions = [
    {
        key: 1,
        value: 'Option 1'
    },
    {
        key: 2,
        value: 'Option 2'
    }
];

export const typeOfTask = [
    {
        key: 'event',
        value: 'Event'
    },
    {
        key: 'document',
        value: 'Document'
    }
];

export const linkTaskOptions = [
    {
        key: 1,
        value: '9988765'
    },
    {
        key: 2,
        value: '6688765'
    }
]


export const filterEventOptions = [
    {
        key: 1,
        value: 'Vesel departure from first POL'
    },
    {
        key: 2,
        value: 'Vessel arrival from last POD'
    }
];

export const noticeOptions = [
    {
        key: 1,
        value: 'Mark as read'
    },
    {
        key: 2,
        value: 'Delete this notification'
    }
];

export const teamOptions = [
    {
        key: 1,
        value: 'Trames Pte. Ltd.'
    },
    {
        key: 2,
        value: 'Rickland logistics'
    },
    {
        key: 3,
        value: 'Damco Pte.Ltd.'
    }
];

export const notifications = [
    {
        time : "Today",
        detail : [
            {
                icon : 'icon-ship',
                name : 'You are assigned to SI cutoff date under SGGIN-AUSYD - 25092019(1234)',
                time : '2 mins ago'
            },
            {
                icon : 'icon-organization',
                name : 'You are invited to TRAMES PTE. LTD.',
                time : '6 hours ago'
            }
        ]
    },
    {
        time : "Yesterday",
        detail : [
            {
                icon : 'icon-ship',
                name : 'You are assigned to SI cutoff date under Sggin-AuSyd - 25092019(1234)',
                time : '07:30 AM'
            },
            {
                icon : 'icon-organization',
                name : 'You are invited to TRAMES PTE. LTD.',
                time : '06:47 PM'
            }
        ]
    }

]
export const userOptions = [
    {
        key: 3,
        value: 'Personal settings',
        path: PERSONAL_SETTINGS_URL,
        icon: 'icon-user-settings'
    },
    {
        key: 4,
        value: 'Change Password',
        path: CHANGE_PASSWORD_URL,
        icon: 'icon-padlock'
    },
    {
        key: 5,
        value: 'Sign Out',
        path: LOGIN_URL,
        icon: 'icon-logout'
    }
];

export const homeLinks = [
    // {
    //     name: 'Booking Request',
    //     url: BOOKING_REQUEST_URL
    // },
    // {
    //     name: 'Track shipment',
    //     url: TRACK_SHIPMENT_URL
    // },
    // {
    //     name: 'Active shipments',
    //     url: ACTIVE_SHIPMENTS_URL
    // },
    {
        name: 'Teams',
        url: ALL_TEAMS_URL
    },
    {
        name: 'Tasks',
        url: TASKS_URL
    },
    // {
    //     name: 'Vessel schedule',
    //     url: VESSEL_SCHEDULE_URL
    // },
];

export const searchParams = [
    {
        label: 'Booking no',
        value: 'BC3682942'
    },
    {
        label: 'Carrier',
        value: 'Maersk pte. ltd.'
    },
    {
        label: 'Ports',
        value: 'Singapore port (SGSIN) - Jakarta port (IDJKT)',
        block: true
    },
    {
        label: 'Vessel ETD',
        value: '2 Jul 2020, 12:15 AM'
    },
    {
        label: 'Vessel ETA',
        value: '14 Jul 2020, 07:30 PM'
    }
]

export const shipmentProcess = [
    {
        icon: 'icon-container',
        title: 'PREPOL',
        vessel : '',
        labelVessel: '',
        status: 'done',
        items: [
            {
                label: 'Empty container pickup',
                value: ''
            }
        ]
    },
    {
        icon: 'icon-anchor',
        title: 'Singapore port',
        vessel : 'Queen Elizabeth (782942)',
        labelVessel: 'Vessel:',
        status: 'done',
        items: [
            {
                label: 'Gate In',
                value: '30 Sep 2020 02:10 AM'
            },
            {
                label: 'Discharged',
                value: '2 Oct 2020 12:45 PM'
            },
            {
                label: 'Vessel departed',
                value: '4 Oct 2020 10:30 AM'
            }
        ]
    },
    {
        icon: 'icon-anchor',
        title: 'Visakhapatnam port',
        vessel: '',
        labelVessel: '',
        status: 'done',
        items: [
            {
                label: 'Est. Vessel arrival',
                value: '30 Sep 2020 02:10 AM'
            },
            {
                label: 'Est. Discharged',
                value: '2 Oct 2020 12:45 PM'
            },
            {
                label: 'Est. Gate Out',
                value: '4 Oct 2020 10:30 AM'
            }
        ]
    },
    {
        icon: 'icon-containers',
        status: 'pending',
        items: [
            {
                label: 'Est. Delivery',
                value: '30 Sep 2020 02:10 AM'
            }
        ]
    }
];

export const steps = [
    {
        name: 'Shipment details',
    },
    {
        name: 'Invite partners'
    },
    {
        name: 'Verify details'
    }
];

export const stepsBookingRequest = [
    {
        name: 'Shipment details'
    },
    {
        name: 'Choose a Freight Partner'
    }
]

export const shipmentsList = [
    {
        id: 'as1',
        departureCode: 'SGSIN',
        arrivalCode: 'AUMED',
        departureDate: '2019-09-25',
        note: 'Direct FCL with Bill of lading',
        status: 'complete',
        shipment: {
            type: 'FCL',
            icon: 'icon-container-solid',
            product: {
                type: 'container',
                num: 2
            }
        },
        activeStep: 2,
        steps: [
            {
                id: 'as1-step1',
                icon: 'icon-containers',
                title: 'PREPOL',
                label: 'Arr: ',
                date: '2020-07-30',
                showHours: false
            },
            {
                id: 'as1-step2',
                icon: 'icon-anchor',
                title: 'Pasir port, Singapore(SGSIN)',
                label: 'Dept: ',
                date: '2020-08-08 18:15',
                showHours: true
            },
            {
                id: 'as1-step3',
                icon: 'icon-ship'
            },
            {
                id: 'as1-step4',
                icon: 'icon-anchor',
                title: 'Melbourne port, Australia(AUMED)',
                label: 'Est Arr: ',
                date: '2020-08-17 12:39',
                showHours: true
            },
            {
                id: 'as1-step5',
                icon: 'icon-containers',
                title: 'POSTPOD',
                label: 'Est. Arr: ',
                date: '2020-08-25',
                showHours: false
            }
        ],
        progresses: [
            {
                id: 'as1-booking-details',
                icon: 'icon-containers',
                title: 'Booking details',
                statuses: [
                    {
                        id: SHIPMENT_STATUS.INPROGRESS,
                        num: 3
                    },
                    {
                        id: SHIPMENT_STATUS.PENDING,
                        num: 2
                    },
                    {
                        id: SHIPMENT_STATUS.STUCK,
                        num: 4
                    },
                    {
                        id: SHIPMENT_STATUS.DONE,
                        num: 1
                    }
                ]
            },
            {
                id: 'as1-origin-cy',
                icon: 'icon-containers',
                title: 'Origin CY',
                statuses: [
                    {
                        id: SHIPMENT_STATUS.INPROGRESS,
                        num: 2
                    },
                    {
                        id: SHIPMENT_STATUS.DONE,
                        num: 3
                    }
                ]
            },
            {
                id: 'as1-shipper-warehouse',
                icon: 'icon-containers',
                title: 'Shipper warehouse',
                statuses: [
                    {
                        id: SHIPMENT_STATUS.INPROGRESS,
                        num: 1
                    },
                    {
                        id: SHIPMENT_STATUS.PENDING,
                        num: 1
                    },
                    {
                        id: SHIPMENT_STATUS.STUCK,
                        num: 1
                    },
                    {
                        id: SHIPMENT_STATUS.DONE,
                        num: 2
                    }
                ]
            },
            {
                id: 'as1-export-custom',
                icon: 'icon-containers',
                title: 'Export custom',
                statuses: [
                    {
                        id: SHIPMENT_STATUS.PENDING,
                        num: 1
                    },
                    {
                        id: SHIPMENT_STATUS.DONE,
                        num: 5
                    }
                ]
            },
            {
                id: 'as1-origin-port',
                icon: 'icon-containers',
                title: 'Origin port',
                statuses: [
                    {
                        id: SHIPMENT_STATUS.INPROGRESS,
                        num: 1
                    },
                    {
                        id: SHIPMENT_STATUS.PENDING,
                        num: 1
                    },
                    {
                        id: SHIPMENT_STATUS.STUCK,
                        num: 3
                    }
                ]
            },
            {
                id: 'as1-destination-port',
                icon: 'icon-containers',
                title: 'Destination port',
                statuses: [
                    {
                        id: SHIPMENT_STATUS.INPROGRESS,
                        num: 3
                    },
                    {
                        id: SHIPMENT_STATUS.STUCK,
                        num: 2
                    }
                ]
            },
            {
                id: 'as1-import-custom',
                icon: 'icon-containers',
                title: 'Import custom',
                statuses: [
                    {
                        id: SHIPMENT_STATUS.INPROGRESS,
                        num: 2
                    }
                ]
            },
            {
                id: 'as1-consignee-warehouse',
                icon: 'icon-containers',
                title: 'Consignee warehouse',
                statuses: [
                    {
                        id: SHIPMENT_STATUS.INPROGRESS,
                        num: 1
                    },
                    {
                        id: SHIPMENT_STATUS.PENDING,
                        num: 1
                    },
                    {
                        id: SHIPMENT_STATUS.STUCK,
                        num: 1
                    },
                    {
                        id: SHIPMENT_STATUS.DONE,
                        num: 2
                    }
                ]
            },
            {
                id: 'as1-destination-cy',
                icon: 'icon-containers',
                title: 'Destination CY',
                statuses: [
                    {
                        id: SHIPMENT_STATUS.PENDING,
                        num: 1
                    }
                ]
            }
        ],
        tasksOpen: 2
    },
    {
        id: 'as2',
        departureCode: 'SGSIN',
        arrivalCode: 'AUMED',
        departureDate: '2019-09-25',
        note: 'Direct LCL with Bill of lading',
        status: 'complete',
        shipment: {
            type: 'LCL',
            icon: 'icon-box',
        },
        activeStep: 2,
        steps: [
            {
                id: 'as1-step1',
                icon: 'icon-containers',
                title: 'PREPOL',
                label: 'Arr: ',
                date: '2020-07-30',
                showHours: false
            },
            {
                id: 'as1-step2',
                icon: 'icon-anchor',
                title: 'Pasir port, Singapore(SGSIN)',
                label: 'Dept: ',
                date: '2020-08-08 18:15',
                showHours: true
            },
            {
                id: 'as1-step3',
                icon: 'icon-ship'
            },
            {
                id: 'as1-step4',
                icon: 'icon-anchor',
                title: 'Melbourne port, Australia(AUMED)',
                label: 'Est Arr: ',
                date: '2020-08-17 12:39',
                showHours: true
            },
            {
                id: 'as1-step5',
                icon: 'icon-containers',
                title: 'POSTPOD',
                label: 'Est. Arr: ',
                date: '2020-08-25',
                showHours: false
            }
        ],
        progresses: [
            {
                id: 'as1-booking-details',
                icon: 'icon-containers',
                title: 'Booking details',
                statuses: [
                    {
                        id: SHIPMENT_STATUS.INPROGRESS,
                        num: 3
                    },
                    {
                        id: SHIPMENT_STATUS.PENDING,
                        num: 2
                    },
                    {
                        id: SHIPMENT_STATUS.STUCK,
                        num: 4
                    },
                    {
                        id: SHIPMENT_STATUS.DONE,
                        num: 1
                    }
                ]
            },
            {
                id: 'as1-origin-cy',
                icon: 'icon-containers',
                title: 'Origin CY',
                statuses: [
                    {
                        id: SHIPMENT_STATUS.INPROGRESS,
                        num: 2
                    },
                    {
                        id: SHIPMENT_STATUS.DONE,
                        num: 3
                    }
                ]
            },
            {
                id: 'as1-shipper-warehouse',
                icon: 'icon-containers',
                title: 'Shipper warehouse',
                statuses: [
                    {
                        id: SHIPMENT_STATUS.INPROGRESS,
                        num: 1
                    },
                    {
                        id: SHIPMENT_STATUS.PENDING,
                        num: 1
                    },
                    {
                        id: SHIPMENT_STATUS.STUCK,
                        num: 1
                    },
                    {
                        id: SHIPMENT_STATUS.DONE,
                        num: 2
                    }
                ]
            },
            {
                id: 'as1-export-custom',
                icon: 'icon-containers',
                title: 'Export custom',
                statuses: [
                    {
                        id: SHIPMENT_STATUS.PENDING,
                        num: 1
                    },
                    {
                        id: SHIPMENT_STATUS.DONE,
                        num: 5
                    }
                ]
            },
            {
                id: 'as1-origin-port',
                icon: 'icon-containers',
                title: 'Origin port',
                statuses: [
                    {
                        id: SHIPMENT_STATUS.INPROGRESS,
                        num: 1
                    },
                    {
                        id: SHIPMENT_STATUS.PENDING,
                        num: 1
                    },
                    {
                        id: SHIPMENT_STATUS.STUCK,
                        num: 3
                    }
                ]
            },
            {
                id: 'as1-destination-port',
                icon: 'icon-containers',
                title: 'Destination port',
                statuses: [
                    {
                        id: SHIPMENT_STATUS.INPROGRESS,
                        num: 3
                    },
                    {
                        id: SHIPMENT_STATUS.STUCK,
                        num: 2
                    }
                ]
            },
            {
                id: 'as1-import-custom',
                icon: 'icon-containers',
                title: 'Import custom',
                statuses: [
                    {
                        id: SHIPMENT_STATUS.INPROGRESS,
                        num: 2
                    }
                ]
            },
            {
                id: 'as1-consignee-warehouse',
                icon: 'icon-containers',
                title: 'Consignee warehouse',
                statuses: [
                    {
                        id: SHIPMENT_STATUS.INPROGRESS,
                        num: 1
                    },
                    {
                        id: SHIPMENT_STATUS.PENDING,
                        num: 1
                    },
                    {
                        id: SHIPMENT_STATUS.STUCK,
                        num: 1
                    },
                    {
                        id: SHIPMENT_STATUS.DONE,
                        num: 2
                    }
                ]
            },
            {
                id: 'as1-destination-cy',
                icon: 'icon-containers',
                title: 'Destination CY',
                statuses: [
                    {
                        id: SHIPMENT_STATUS.PENDING,
                        num: 1
                    }
                ]
            }
        ],
        tasksOpen: 2
    },
    {
        id: 'as3',
        departureCode: 'SGSIN',
        arrivalCode: 'AUMED',
        departureDate: '2019-09-25',
        note: 'Direct LCL with Bill of lading',
        status: 'complete',
        shipment: {
            type: 'LCL',
            icon: 'icon-box'
        },
        activeStep: 2,
        steps: [
            {
                id: 'as1-step1',
                icon: 'icon-containers',
                title: 'PREPOL',
                label: 'Arr: ',
                date: '2020-07-30',
                showHours: false
            },
            {
                id: 'as1-step2',
                icon: 'icon-anchor',
                title: 'Pasir port, Singapore(SGSIN)',
                label: 'Dept: ',
                date: '2020-08-08 18:15',
                showHours: true
            },
            {
                id: 'as1-step3',
                icon: 'icon-ship'
            },
            {
                id: 'as1-step4',
                icon: 'icon-anchor',
                title: 'Melbourne port, Australia(AUMED)',
                label: 'Est Arr: ',
                date: '2020-08-17 12:39',
                showHours: true
            },
            {
                id: 'as1-step5',
                icon: 'icon-containers',
                title: 'POSTPOD',
                label: 'Est. Arr: ',
                date: '2020-08-25',
                showHours: false
            }
        ],
        progresses: [
            {
                id: 'as1-booking-details',
                icon: 'icon-containers',
                title: 'Booking details',
                statuses: [
                    {
                        id: SHIPMENT_STATUS.INPROGRESS,
                        num: 3
                    },
                    {
                        id: SHIPMENT_STATUS.PENDING,
                        num: 2
                    },
                    {
                        id: SHIPMENT_STATUS.STUCK,
                        num: 4
                    },
                    {
                        id: SHIPMENT_STATUS.DONE,
                        num: 1
                    }
                ]
            },
            {
                id: 'as1-origin-cy',
                icon: 'icon-containers',
                title: 'Origin CY',
                statuses: [
                    {
                        id: SHIPMENT_STATUS.INPROGRESS,
                        num: 2
                    },
                    {
                        id: SHIPMENT_STATUS.DONE,
                        num: 3
                    }
                ]
            },
            {
                id: 'as1-shipper-warehouse',
                icon: 'icon-containers',
                title: 'Shipper warehouse',
                statuses: [
                    {
                        id: SHIPMENT_STATUS.INPROGRESS,
                        num: 1
                    },
                    {
                        id: SHIPMENT_STATUS.PENDING,
                        num: 1
                    },
                    {
                        id: SHIPMENT_STATUS.STUCK,
                        num: 1
                    },
                    {
                        id: SHIPMENT_STATUS.DONE,
                        num: 2
                    }
                ]
            },
            {
                id: 'as1-export-custom',
                icon: 'icon-containers',
                title: 'Export custom',
                statuses: [
                    {
                        id: SHIPMENT_STATUS.PENDING,
                        num: 1
                    },
                    {
                        id: SHIPMENT_STATUS.DONE,
                        num: 5
                    }
                ]
            },
            {
                id: 'as1-origin-port',
                icon: 'icon-containers',
                title: 'Origin port',
                statuses: [
                    {
                        id: SHIPMENT_STATUS.INPROGRESS,
                        num: 1
                    },
                    {
                        id: SHIPMENT_STATUS.PENDING,
                        num: 1
                    },
                    {
                        id: SHIPMENT_STATUS.STUCK,
                        num: 3
                    }
                ]
            },
            {
                id: 'as1-destination-port',
                icon: 'icon-containers',
                title: 'Destination port',
                statuses: [
                    {
                        id: SHIPMENT_STATUS.INPROGRESS,
                        num: 3
                    },
                    {
                        id: SHIPMENT_STATUS.STUCK,
                        num: 2
                    }
                ]
            },
            {
                id: 'as1-import-custom',
                icon: 'icon-containers',
                title: 'Import custom',
                statuses: [
                    {
                        id: SHIPMENT_STATUS.INPROGRESS,
                        num: 2
                    }
                ]
            },
            {
                id: 'as1-consignee-warehouse',
                icon: 'icon-containers',
                title: 'Consignee warehouse',
                statuses: [
                    {
                        id: SHIPMENT_STATUS.INPROGRESS,
                        num: 1
                    },
                    {
                        id: SHIPMENT_STATUS.PENDING,
                        num: 1
                    },
                    {
                        id: SHIPMENT_STATUS.STUCK,
                        num: 1
                    },
                    {
                        id: SHIPMENT_STATUS.DONE,
                        num: 2
                    }
                ]
            },
            {
                id: 'as1-destination-cy',
                icon: 'icon-containers',
                title: 'Destination CY',
                statuses: [
                    {
                        id: SHIPMENT_STATUS.PENDING,
                        num: 1
                    }
                ]
            }
        ],
        tasksOpen: 2
    }
];

export const BookingDetails = [
  {
    biling: [
      {
        title: "Booking no",
        code: "BN823592",
            grid: "col"
      },
      {
        title: "Booking ref no",
        code: "BN893459353",
          grid: "col",
      },
      {
        title: "Rate agreement ref no",
        code: "RAN 242502",
          grid: "col",
      },
      {
        title: "service mode",
        code: "CY/CY",
          grid: "col",
      },
      {
        title: "Incoterm",
        code: "CPT",
          grid: "col",
      },
      {
        title: "Shipment type",
        code: "FCL",
          grid: "col"
      },
      {
        title: "Booking date",
        code: "14 Jul 2020 13:30",
          grid: "col-3",
      },
    ],
    provider: [
      {
        name: "Brent Clarke",
      },
      {
        name: "COSCO SHIPPING Lines Pte Ltd",
      },
      {
        name: "16, CHANIGI NORTH WAY, SINGAPORE 498772",
      },
      {
        name: "bryana_cole@yahoo.com 216-878-5419",
      },
    ],
    bookingParty: [
      {
        name: "Jon Norton",
      },
      {
        name: "Amazon Singapore Pte Ltd",
      },
      {
        name: "871 Sally Lodge Suite 333, Singapore 568293",
      },
      {
        name: "bryana.stockes@yahoo.com 791-165-2710",
      },
    ],
  },
];

export const involvedParty = [
  {
    fieldDetails: [
      {
        title: "Shipper",
        company: "COSCO SHIPPING Lines Pte Ltd",
        address: "16 CHANIGI NORTH WAY, SINGAPORE 498772",
        email: "Bryana_cole@yahoo.com",
        phone: "216-878-5419",
      },
      {
        title: "Consignee",
        company: "COSCO SHIPPING Lines Pte Ltd",
        address: "16 CHANIGI NORTH WAY, SINGAPORE 498772",
        email: "Bryana_cole@yahoo.com",
        phone: "216-878-5419",
      },
      {
        title: "Carrier or Freight",
        company: "COSCO SHIPPING Lines Pte Ltd",
        address: "16 CHANIGI NORTH WAY, SINGAPORE 498772",
        email: "Bryana_cole@yahoo.com",
        phone: "216-878-5419",
      },
      {
        title: "Notify party",
        company: "COSCO SHIPPING Lines Pte Ltd",
        address: "16 CHANIGI NORTH WAY, SINGAPORE 498772",
        email: "Bryana_cole@yahoo.com",
        phone: "216-878-5419",
      },
    ],
  },
];

export const vesselRouteInfo = [
  {
    dataVessel: [
      {
        title: "Vessel Information",
        name: "Vessel name",
        vessel: "COSCO SHIPPING VIRGO",
        port: "Origin port",
        portName: "Port name",
        portAdress: "Singapore port",
        terminal: 'Terminal',
        date: 'PSA Singapore Terminal',
        grid: "col-3"
      },
      {
        title: "",
        name: "Voyage",
        vessel: "RAN 242502",
        port: "",
        portName: "Port code",
        portAdress: "SGSIN",
        terminal: 'ETA at origin port',
        date: '18 Jul 2020 13:30',
        grid: "col"
      },
      {
        title: "",
        name: "IMO",
        vessel: "CY/CY",
        port: "",
        portName: "",
        portAdress: "",
        terminal: 'ETD from origin port',
        date: '20 Jul 2020 10:30',
        grid: "col"
      },
      {
        title: "Carrier Information",
        name: "Carrier name",
        vessel: "COSCO SHIPPING",
        port: "Destination port",
        portName: "Port name",
        portAdress: "Jarkarta port, Indonesia",
        terminal: 'Terminal',
        date: 'TERMINAL 3 TANJUNG PRIOK',
        grid: "col-3"
      },
      {
        title: "",
        name: "SCAC code",
        vessel: "COSCO",
        port: "",
        portName: "Port code",
        portAdress: "IDJKT",
        terminal: 'ETA at destination port',
        date: '29 Jul 2020 12:30',
        grid: "col-3"
      },
    ],
  },
];
export const pickupDropLocation = [
    {
        title: "Empty container pickup",
        NamelocationDate: "Location",
        locationDate: "COSCO SHIPPING Lines Pte Ltd",
        address: "16 CHANGI NORTH WAY, SINGAPORE 498772",
        email: "bryana_cole@yahoo.com",
        code: '216-878-5419',
    },
    {
        title: "",
        NamelocationDate: "Pickup date",
        locationDate: "16 Jul 2020 14:15",
        address: "",
        email: "",
        code: '',
    },
    {
        title: "Full container return",
        NamelocationDate: "Location",
        locationDate: "COSCO SHIPPING Lines Pte Ltd",
        address: "16 CHANGI NORTH WAY, SINGAPORE 498772",
        email: "bryana_cole@yahoo.com",
        code: '216-878-5419',
    },
    {
        title: "",
        NamelocationDate: "Return date",
        locationDate: "16 Jul 2020 14:15",
        address: "",
        email: "",
        code: '',
    },
 ]

 export const containerCargo = [
    {
        info: [
            {
                name : "Container type",
                weight : '20 DRY ST',
                grid : 'col-9',
            },
            {
                name : " Gross weight",
                weight : '13,485 KG',
                grid : 'col',
            },
            {
                name : " Gross volume",
                weight : '42,5 MB',
                grid : 'col',
            }
         ],

         info2: [
            {
                name : "Container type",
                weight : '20 DRY ST',
                grid : 'col-9',
            },
            {
                name : " Gross weight",
                weight : '13,485 KG',
                grid : 'col',
            },
            {
                name : " Gross volume",
                weight : '42,5 MB',
                grid : 'col',
            }
         ],

    },




 ]
export const cutoffDates = [
    {
        name : 'Document cut-off date',
        date : '19 Jul 2020 13:30'
    },
    {
        name : 'VGM cut-off date',
        date : '19 Jul 2020 13:30'
    },
    {
        name : 'Custom cut-off date',
        date : '19 Jul 2020 13:30'
    },
    {
        name : 'Port cut-off date',
        date : '19 Jul 2020 13:30'
    },
 ]
export const roles = [
    {
        id: 'SHIPPER',
        name: 'Shipper',
        icon: 'icon-shipper'
    },
    {
        id: 'CONSIGNEE',
        name: 'Consignee',
        icon: 'icon-box'
    },
    {
        id: 'FREIGHT',
        name: 'Freight',
        icon: 'icon-truck'
    },
    {
        id: 'EXPORT_LOGISTICS',
        name: 'Export Logistics',
        icon: 'icon-box-export'
    },
    {
        id: 'IMPORT_LOGISTICS',
        name: 'Import Logistics',
        icon: 'icon-box-import'
    },
    {
        id: 'EXPORT_CUSTOMS',
        name: 'Export Customs',
        icon: 'icon-export'
    },
    {
        id: 'IMPORT_CUSTOMS',
        name: 'Import Customs',
        icon: 'icon-import'
    }
];

export const shipmentTypes = [
    {
        id: 'FCL',
        name: 'FCL',
        icon: 'icon-container-solid'
    },
    {
        id: 'LCL',
        name: 'LCL',
        icon: 'icon-boxes-solid'
    }
];

export const transportTypes = [
    {
        id: 'sea',
        name: 'Sea',
        icon: 'icon-ship'
    },
    {
        id: 'plane',
        name: 'Plane',
        icon: 'icon-box'
    },
    {
        id: 'land',
        name: 'Land',
        icon: 'icon-truck'
    }
]
export const multiselectValues = [
    {
        id: 'mem1',
        icon: 'icon-envelop',
        title: 'gusiko_mazie@lois.us',
        description: 'Invite by email',
        type: 0
    },
    {
        id: 'mem2',
        icon: 'icon-users',
        title: 'Management',
        description: 'Trames Pte. Ltd.',
        type: 1
    },
    {
        id: 'mem3',
        icon: avatar,
        title: 'Loretta Hale',
        description: 'corine.schmidt@gmail.com',
        type: 0
    },
    {
        id: 'mem4',
        icon: avatar,
        title: 'Laura Lee',
        description: 'jenkins_jessica@ffertz.com',
        type: 0
    }
];

export const organizationsHeader = {
    label: 'organization',
    suffix: 's'
};

export const teamsHeader = {
    count: 4,
    label: 'team',
    suffix: 's'
};

export const membersHeader = {
    count: 74,
    label: 'member',
    suffix: 's'
};

export const tasksHeader = {
  count: 4,
  label: 'task',
  suffix: 's'
};
export const templatesHeader = {
    count: 4,
    label: 'template',
    suffix: 's'
};


export const STATUSES = {
    INVITED: 'invited',
    ACTIVE: 'active',
    INACTIVE: 'inactive'
};

export const organizationMembersList = [
    {
        id: 'mem1',
        avatar,
        name: 'Florence Wade',
        email: 'gerda.bechtelar@yahoo.com',
        mobile: '384-842-8951',
        status: STATUSES.INVITED,
        organizations: [
            {
                id: 'org1'
            }
        ],
        roles: [
            'icon-calendar',
            'icon-city',
            'icon-export',
            'icon-anchor',
            'icon-import'
        ]
    },
    {
        id: 'mem2',
        avatar,
        name: 'Minerva Wise',
        email: 'schuppe.juana@writing.name',
        mobile: '957-648-9720',
        status: STATUSES.ACTIVE,
        organizations: [
            {
                id: 'org2'
            }
        ],
        roles: [
            'icon-calendar',
        ]
    },
    {
        id: 'mem3',
        avatar,
        name: 'Jane Drake',
        email: 'kevin.leannon@hotmail.com',
        mobile: '082-069-5147',
        status: STATUSES.ACTIVE,
        organizations: [
            {
                id: 'org2'
            },
            {
                id: 'org3'
            }
        ],
        roles: [
            'icon-anchor',
            'icon-import'
        ]
    },
    {
        id: 'mem4',
        avatar,
        name: 'Ernest Cross',
        email: 'marcelle_collier@zakary.info',
        mobile: '949-292-6707',
        status: STATUSES.INVITED,
        organizations: [
            {
                id: 'org1'
            }
        ],
        roles: [
            'icon-city'
        ]
    },
    {
        id: 'mem5',
        avatar,
        name: 'Chase Nunez',
        email: 'opal_terry@harber.net',
        mobile: '808-728-4116',
        status: STATUSES.INVITED,
        organizations: [
            {
                id: 'org1'
            },
            {
                id: 'org2'
            },
            {
                id: 'org3'
            }
        ],
        roles: [
            'icon-city',
            'icon-export'
        ]
    },
    {
        id: 'mem6',
        avatar,
        name: 'Norman Walters',
        email: 'buford_corkery@stoman.us',
        mobile: '623-656-9185',
        status: STATUSES.ACTIVE,
        organizations: [
            {
                id: 'org2'
            },
        ],
        roles: [
            'icon-import'
        ]
    },
    {
        id: 'mem7',
        avatar,
        name: 'Russell Stevens',
        email: 'aliya.rogahn@hotmail.com',
        mobile: '957-648-9720',
        status: STATUSES.INACTIVE,
        organizations: [
            {
                id: 'org1'
            },
            {
                id: 'org2'
            }
        ],
        roles: [
            'icon-calendar',
            'icon-city',
            'icon-export',
            'icon-anchor',
            'icon-import'
        ]
    },
    {
        id: 'mem8',
        avatar,
        name: 'Isabel Miller',
        email: 'nella_hudson@yahoo.com',
        mobile: '082-069-5147',
        status: STATUSES.ACTIVE,
        organizations: [
            {
                id: 'org1'
            },
        ],
        roles: [
            'icon-calendar',
            'icon-city',
            'icon-import'
        ]
    },
    {
        id: 'mem9',
        avatar,
        name: 'Mattie Larson',
        email: 'noemy.swift@hotmail.com',
        mobile: '949-292-6707',
        status: STATUSES.INVITED,
        organizations: [
            {
                id: 'org1'
            }
        ],
        roles: [
            'icon-calendar',
            'icon-city',
            'icon-export',
            'icon-anchor',
            'icon-import'
        ]
    },
];

export const organizationTeamsList = [
    {
        id: 'team1',
        name: 'Business',
        bio: 'Team for handling the partners business',
        organization: {
            id: 'org1'
        },
        members: organizationMembersList
    },
    {
        id: 'team2',
        name: 'Shipment booking',
        bio: 'Can help to create the booking and organize till the shipment is ready to truck or arrived',
        organization: {
            id: 'org2'
        },
        members: organizationMembersList.slice(0, 7)
    },
    {
        id: 'team3',
        name: 'Billing',
        bio: 'Internet Advertising Trends You Won T Be Disappointed',
        organization: {
            id: 'org2'
        },
        members: organizationMembersList.slice(0, 6)
    },
    {
        id: 'team4',
        name: 'Support',
        bio: 'Writing A Good Headline For Your Advertisement',
        organization: {
            id: 'org3'
        },
        members: []
    }
];

export const organizationsList = [
    {
        id: 'org1',
        brand: {
            logo: avatar,
            name: 'Trames pte ltd'
        },
        members: organizationMembersList,
        teams: organizationTeamsList
    },
    {
        id: 'org2',
        brand: {
            logo: avatar,
            name: 'Rickland logistics'
        },
        members: organizationMembersList,
        teams: organizationTeamsList
    },
    {
        id: 'org3',
        brand: {
            logo: avatar,
            name: 'Damco Pte.Ltd.'
        },
        members: organizationMembersList,
        teams: organizationTeamsList
    },
    {
        id: 'org4',
        brand: {
            logo: avatar,
            name: 'Trames pte ltd'
        },
        members: organizationMembersList,
        teams: organizationTeamsList
    },
    {
        id: 'org5',
        brand: {
            logo: avatar,
            name: 'Rickland logistics'
        },
        members: organizationMembersList,
        teams: organizationTeamsList
    },
    {
        id: 'org6',
        brand: {
            logo: avatar,
            name: 'Damco Pte.Ltd.'
        },
        members: [],
        teams: organizationTeamsList
    }
];

export const organizationTemplatesList = [
    {
        id: 'tem1',
        icon: 'icon-container',
        name: 'FCL Shipment',
        bio: 'This shipment template cover the FCL shipment journey',
        progress: ['icon-shipper', 'icon-box'],
        legs: 9,
        events: 45,
        docs: 10
    },
    {
        id: 'tem2',
        icon: 'icon-container',
        name: 'LCL Shipment',
        bio: 'This shipment template cover the LCL shipment journey',
        progress: ['icon-shipper', 'icon-box'],
        legs: 9,
        events: 45,
        docs: 10
    }
];

export const datesCheckbox = [
    {
        id: DEPARTURE,
        name: 'Departure'
    },
    {
        id: ARRIVAL,
        name: 'Arrival'
    }
];

export const reuploadDocument = [
    {
        id: 'BC',
        name: 'BC'
    },
    {
        id: 'MBL',
        name: 'Master BL'
    },
    {
        id: 'HBL',
        name: 'House BL'
    },
]

export const linksCheckbox = [
    {
        id: 'yes',
        name: 'Yes'
    },
    {
        id: 'no',
        name: 'No'
    }
]

export const serviceProvider = [
    {
        id: 'mitsui',
        name: 'Mitsui'
    },
    {
        id: 'cma',
        name: 'CMA CMG'
    },
    {
        id: 'cosco',
        name: 'Cosco'
    },
    {
        id: 'maerskLine',
        name: 'Maersk line'
    },
    {
        id: 'one',
        name: 'ONE'
    }
];

export const documentList = [
    {
        id: 'invoice1',
        name: 'invoice1.pdf'
    },
    {
        id: 'invoice2',
        name: 'invoice2.pdf'
    },
    {
        id: 'invoice3',
        name: 'invoice3.pdf'
    }
]

export const destinationPort = [
    {
        id: 'inmaa',
        name: 'INMAA'
    },
    {
        id: 'incha',
        name: 'INCHA'
    },
    {
        id: 'inbrlr',
        name: 'INBRLR'
    },
    {
        id: 'inyur',
        name: 'INYUR'
    },
    {
        id: 'inbom',
        name: 'INBOM'
    }
]

export const originPort = [
    {
        id: 'sgsin',
        name: 'SGSIN'
    }
]

export const userOrganizations = [
    {
        id: 'tr',
        name: 'TR'
    },
    {
        id: 'rl',
        name: 'RL'
    }
];

export const schedulesResult =   [
    {
        id: 'schedule1',
        providerLogo: ooclLogo,
        departurePort: {
            code: 'SGSIN',
            name: 'Singapore port'
        },
        transhipped: [
            {
                code: 'CLCMB',
                name: 'Colombo port'
            },
            {
                code: 'AKGAC',
                name: 'Almania port'
            }
        ],
        arrivalPort: {
            code: 'AUSYD',
            name: 'Sydney port'
        },
        departureDate: '2020-07-23',
        arrivalDate: '2020-07-29',
        duration: 12,
        durationNote: '1 T/S',
        routes: [
            {
                provider: 'Maersk miami',
                voyage: '0066S',
                service: 'Sino australia central service southbound (SAC)',
                departurePort: {
                    code: 'SGSIN',
                    name: 'Singapore port'
                },
                arrivalPort: {
                    code: 'CLCMB',
                    name: 'Colombo port'
                },
                departureDate: '2020-07-23',
                arrivalDate: '2020-07-25',
            }
        ]
    },
    {
        id: 'schedule2',
        providerLogo: mitsuicoLogo,
        departurePort: {
            code: 'SGSIN',
            name: 'Singapore port'
        },
        transhipped: [
            {
                code: 'CLCMB',
                name: 'Colombo port'
            }
        ],
        arrivalPort: {
            code: 'AUSYD',
            name: 'Sydney port'
        },
        departureDate: '2020-07-23',
        arrivalDate: '2020-07-29',
        duration: 12,
        durationNote: '1 T/S',
        routes: [
            {
                provider: 'Maersk miami',
                voyage: '0066S',
                service: 'Sino australia central service southbound (SAC)',
                departurePort: {
                    code: 'SGSIN',
                    name: 'Singapore port'
                },
                arrivalPort: {
                    code: 'CLCMB',
                    name: 'Colombo port'
                },
                departureDate: '2020-07-23',
                arrivalDate: '2020-07-25',
            }
        ]
    },
    {
        id: 'schedule3',
        providerLogo: maersklineLogo,
        departurePort: {
            code: 'SGSIN',
            name: 'Singapore port'
        },
        transhipped: [
            {
                code: 'CLCMB',
                name: 'Colombo port'
            }
        ],
        arrivalPort: {
            code: 'AUSYD',
            name: 'Sydney port'
        },
        departureDate: '2020-07-23',
        arrivalDate: '2020-07-29',
        duration: 12,
        durationNote: '1 T/S',
        routes: [
            {
                provider: 'Maersk miami',
                voyage: '0066S',
                service: 'Sino australia central service southbound (SAC)',
                departurePort: {
                    code: 'SGSIN',
                    name: 'Singapore port'
                },
                arrivalPort: {
                    code: 'CLCMB',
                    name: 'Colombo port'
                },
                departureDate: '2020-07-23',
                arrivalDate: '2020-07-25',
            },
            {
                provider: 'Seamax stratford',
                voyage: '0101S',
                service: 'Far East Australia Service (A3C)',
                departurePort: {
                    code: 'CLCMB',
                    name: 'Colombo port'
                },
                arrivalPort: {
                    code: 'AUSYD',
                    name: 'Sydney port'
                },
                departureDate: '2020-07-25',
                arrivalDate: '2020-07-29',
            }
        ]
    },
    {
        id: 'schedule4',
        providerLogo: cmaLogo,
        departurePort: {
            code: 'SGSIN',
            name: 'Singapore port'
        },
        transhipped: [
            {
                code: 'CLCMB',
                name: 'Colombo port'
            }
        ],
        arrivalPort: {
            code: 'AUSYD',
            name: 'Sydney port'
        },
        departureDate: '2020-07-23',
        arrivalDate: '2020-07-29',
        duration: 12,
        durationNote: '1 T/S',
        routes: [
            {
                provider: 'Maersk miami',
                voyage: '0066S',
                service: 'Sino australia central service southbound (SAC)',
                departurePort: {
                    code: 'SGSIN',
                    name: 'Singapore port'
                },
                arrivalPort: {
                    code: 'CLCMB',
                    name: 'Colombo port'
                },
                departureDate: '2020-07-23',
                arrivalDate: '2020-07-25',
            }
        ]
    },
    {
        id: 'schedule5',
        providerLogo: coscoLogo,
        departurePort: {
            code: 'SGSIN',
            name: 'Singapore port'
        },
        transhipped: [
            {
                code: 'CLCMB',
                name: 'Colombo port'
            }
        ],
        arrivalPort: {
            code: 'AUSYD',
            name: 'Sydney port'
        },
        departureDate: '2020-07-23',
        arrivalDate: '2020-07-29',
        duration: 12,
        durationNote: '1 T/S',
        routes: [
            {
                provider: 'Maersk miami',
                voyage: '0066S',
                service: 'Sino australia central service southbound (SAC)',
                departurePort: {
                    code: 'SGSIN',
                    name: 'Singapore port'
                },
                arrivalPort: {
                    code: 'CLCMB',
                    name: 'Colombo port'
                },
                departureDate: '2020-07-23',
                arrivalDate: '2020-07-25',
            }
        ]
    },
    {
        id: 'schedule6',
        providerLogo: cmaLogo,
        departurePort: {
            code: 'SGSIN',
            name: 'Singapore port'
        },
        transhipped: [
            {
                code: 'CLCMB',
                name: 'Colombo port'
            }
        ],
        arrivalPort: {
            code: 'AUSYD',
            name: 'Sydney port'
        },
        departureDate: '2020-07-23',
        arrivalDate: '2020-07-29',
        duration: 12,
        durationNote: '1 T/S',
        routes: [
            {
                provider: 'Maersk miami',
                voyage: '0066S',
                service: 'Sino australia central service southbound (SAC)',
                departurePort: {
                    code: 'SGSIN',
                    name: 'Singapore port'
                },
                arrivalPort: {
                    code: 'CLCMB',
                    name: 'Colombo port'
                },
                departureDate: '2020-07-23',
                arrivalDate: '2020-07-25',
            }
        ]
    },
    {
        id: 'schedule7',
        providerLogo: ooclLogo,
        departurePort: {
            code: 'SGSIN',
            name: 'Singapore port'
        },
        transhipped: [
            {
                code: 'CLCMB',
                name: 'Colombo port'
            }
        ],
        arrivalPort: {
            code: 'AUSYD',
            name: 'Sydney port'
        },
        departureDate: '2020-07-23',
        arrivalDate: '2020-07-29',
        duration: 12,
        durationNote: '1 T/S',
        routes: [
            {
                provider: 'Maersk miami',
                voyage: '0066S',
                service: 'Sino australia central service southbound (SAC)',
                departurePort: {
                    code: 'SGSIN',
                    name: 'Singapore port'
                },
                arrivalPort: {
                    code: 'CLCMB',
                    name: 'Colombo port'
                },
                departureDate: '2020-07-23',
                arrivalDate: '2020-07-25',
            }
        ]
    }
]

export const roleList = [
    {
        key: 'OWNER',
        value: 'Owner'
    },
    {
        key: 'ADMIN',
        value: 'Admin'
    },
    {
        key: 'MEMBER',
        value: 'Member'
    }
];

export const memberOrganizations = [
    {
        title: 'Trames pvt. ltd.'
    }
];

export const memberTeams = [
    {
        title: 'Management team'
    },
    {
        title: 'Payroll team'
    },
    {
        title: 'Export transport for India'
    },
    {
        title: 'Import to Singapore'
    }
];

export const userOrganizationsInfo = [
    {
        name : 'trames ple. ltd.',
        role : 'Admin',
        team : [
            {
                teamName : "Management team",
                roleName: "Member"
            },
            {
                teamName : "Payroll team",
                roleName: "Member"
            }

        ]

    }

];

export const logs = [
    {
        name : "Organization Activities Log",
        activities : [
            {
                name: "Florence Wade",
                email: "florencewade0@gmail.com",
                activity : "Floence Wade remove Eliza Santiago from Management team under Trames pvt. Ltd",
                dateTime : "2020-07-12 | 03:40 AM",
            },
            {
                name: "Florence Wade",
                email: "florencewade0@gmail.com",
                activity : "Floence Wade remove Eliza Santiago from Management team under Trames pvt. Ltd",
                dateTime : "2020-07-12 | 03:40 AM",
            },
            {
                name: "Florence Wade",
                email: "florencewade0@gmail.com",
                activity : "Floence Wade remove Eliza Santiago from Management team under Trames pvt. Ltd",
                dateTime : "2020-07-12 | 03:40 AM",
            },
            {
                name: "Florence Wade",
                email: "florencewade0@gmail.com",
                activity : "Floence Wade remove Eliza Santiago from Management team under Trames pvt. Ltd",
                dateTime : "2020-07-12 | 03:40 AM",
            }
        ]
    },
    {
        name : "Team Activities Log",
        activities : [
            {
                name: "Florence Wade",
                email: "florencewade0@gmail.com",
                activity : "Floence Wade remove Eliza Santiago from Management team under Trames pvt. Ltd",
                dateTime : "2020-07-12 | 03:40 AM",
            },
            {
                name: "Florence Wade",
                email: "florencewade0@gmail.com",
                activity : "Floence Wade remove Eliza Santiago from Management team under Trames pvt. Ltd",
                dateTime : "2020-07-12 | 03:40 AM",
            },
            {
                name: "Florence Wade",
                email: "florencewade0@gmail.com",
                activity : "Floence Wade remove Eliza Santiago from Management team under Trames pvt. Ltd",
                dateTime : "2020-07-12 | 03:40 AM",
            },
            {
                name: "Florence Wade",
                email: "florencewade0@gmail.com",
                activity : "Floence Wade remove Eliza Santiago from Management team under Trames pvt. Ltd",
                dateTime : "2020-07-12 | 03:40 AM",
            }
        ]
    },
    {
        name : "Shipment Activities Log",
        activities : [
            {
                name : "Floence Wade update document for Upload shipping note ",
                date : "2020-07-25"
            },
            {
                name : "Floence Wade created SCSIN-AUSYD-25092019 (1234).",
                date : "2020-07-25"
            },
        ]
    }
]
export const tasks = [
    {
        name: 'Booking details',
        events: [
            {
                name: 'Booking confirmed',
                partners: [
                    {
                        id: 1,
                        code: 'shipper',
                        name: 'Shipper'
                    },
                    {
                        id: 2,
                        code: 'city',
                        name: 'Origin CY'
                    },
                    {
                        id: 4,
                        code: 'ship',
                        name: 'Transportation'
                    },
                    {
                        id: 5,
                        code: 'export',
                        name: 'Export Custom'
                    },
                    {
                        id: 6,
                        code: 'export',
                        name: 'Export Custom'
                    }
                ]
            },
            {
                name: 'SI cut off date',
                partners: [
                    {
                        id: 1,
                        code: 'ship',
                        name: 'Transportation'
                    }
                ]
            }
        ],
        documents: [
            {
                name: 'Upload booking confirmation doc',
                partners: [
                    {
                        id: 1,
                        code: 'shipper',
                        name: 'Shipper'
                    },
                    {
                        id: 2,
                        code: 'city',
                        name: 'Origin CY'
                    },
                    {
                        id: 4,
                        code: 'ship',
                        name: 'Transportation'
                    },
                    {
                        id: 5,
                        code: 'export',
                        name: 'Export Custom'
                    },
                    {
                        id: 6,
                        code: 'export',
                        name: 'Export Custom'
                    }
                ]
            }
        ]
    },
    {
        name: 'Origin container yard',
        events: [
            {
                name: 'Booking confirmed',
                partners: [
                    {
                        id: 1,
                        code: 'shipper',
                        name: 'Shipper'
                    },
                    {
                        id: 2,
                        code: 'city',
                        name: 'Origin CY'
                    },
                    {
                        id: 4,
                        code: 'ship',
                        name: 'Transportation'
                    }
                ]
            },
            {
                name: 'SI cut off date',
                partners: [
                    {
                        id: 1,
                        code: 'ship',
                        name: 'Transportation'
                    },
                ]
            }
        ],
        documents: [
            {
                name: 'Upload booking confirmation doc',
                partners: [
                    {
                        id: 1,
                        code: 'shipper',
                        name: 'Shipper'
                    },
                    {
                        id: 2,
                        code: 'city',
                        name: 'Origin CY'
                    },
                    {
                        id: 4,
                        code: 'ship',
                        name: 'Transportation'
                    }
                ]
            }
        ]
    },
    {
        name: 'Shipper Warehouse',
        events: [
            {
                name: 'Pick & pack started',
                partners: [
                    {
                        id: 1,
                        code: 'city',
                        name: 'Origin CY'
                    },
                ]
            },
            {
                name: 'Pick & pack end',
                partners: [
                    {
                        id: 1,
                        code: 'city',
                        name: 'Origin CY'
                    },
                ]
            },
            {
                name: 'Stuffing started',
                partners: [
                    {
                        id: 1,
                        code: 'city',
                        name: 'Origin CY'
                    },
                ]
            },
            {
                name: 'Pick & pack end',
                partners: [
                    {
                        id: 1,
                        code: 'city',
                        name: 'Origin CY'
                    },
                ]
            },
            {
                name: 'Truck in to pickup stussed container',
                partners: [
                    {
                        id: 1,
                        code: 'city',
                        name: 'Origin CY'
                    },
                ]
            },
            {
                name: 'Truck out after picking stuffed contianer',
                partners: [
                    {
                        id: 1,
                        code: 'city',
                        name: 'Origin CY'
                    },
                ]
            },
        ],
        documents: [
            {
                name: 'Upload Packing list',
                partners: [
                    {
                        id: 1,
                        code: 'city',
                        name: 'Origin CY'
                    },
                ]
            },
            {
                name: 'Upload FAN',
                partners: [
                    {
                        id: 1,
                        code: 'city',
                        name: 'Origin CY'
                    },
                ]
            },
            {
                name: 'Upload shipper invoice',
                partners: [
                    {
                        id: 1,
                        code: 'city',
                        name: 'Origin CY'
                    },
                ]
            },
            {
                name: 'Upload cargo photo',
                partners: [
                    {
                        id: 1,
                        code: 'city',
                        name: 'Origin CY'
                    },
                ]
            },
            {
                name: 'Upload certificate of origin (coo)',
                partners: [
                    {
                        id: 1,
                        code: 'city',
                        name: 'Origin CY'
                    },
                ]
            },
            {
                name: 'Upload VGM',
                partners: [
                    {
                        id: 1,
                        code: 'city',
                        name: 'Origin CY'
                    },
                ]
            }
        ]
    },
];

export const dueDateOptions = [
    {
        key: 'VDL',
        value: 'Vessel departure from first POL'
    },
    {
        key: 'VAD',
        value: 'Vessel arrival at final POD'
    }
];

export const daysOptions = [
    {
        key: 1,
        value: 'days'
    },
    {
        key: 2,
        value: 'hours'
    }
];

// TODO: Switch id to BE values
export const taskRoles = [
    {
        id: 'shipper',
        name: 'Shipper',
        icon: 'icon-shipper'
    },
    {
        id: 'consignee',
        name: 'Consignee',
        icon: 'icon-box'
    },
    {
        id: 'freight',
        name: 'Freight',
        icon: 'icon-truck'
    },
    {
        id: 'export-logistics',
        name: 'Export logistics',
        icon: 'icon-box-export'
    },
    {
        id: 'import-logistics',
        name: 'Import logistics',
        icon: 'icon-box-import'
    },
    {
        id: 'export-customs',
        name: 'Export customs',
        icon: 'icon-export'
    },
    {
        id: 'import-customs',
        name: 'Import customs',
        icon: 'icon-import'
    }
];

export const billOfLadingOptions = [
    {
        id: 'bl',
        name: 'BL'
    },
    {
        id: 'bc',
        name: 'BC'
    }
];

export const billOptions = [
    {
        id: 'bc',
        name: 'Booking confirmation'
    },
    {
        id: 'bl',
        name: 'Bill of lading'
    }
];

export const shipmentStatuses = [
    {
        id: SHIPMENT_STATUS.INPROGRESS,
        num: 3
    },
    {
        id: SHIPMENT_STATUS.PENDING,
        num: 2
    },
    {
        id: SHIPMENT_STATUS.STUCK,
        num: 4
    },
    {
        id: SHIPMENT_STATUS.DONE,
        num: 1
    }
];

export const passwordRequired = [
    'At least 8 characters',
    'At least one number',
    'At least one upper case',
    'At least one lower case'
];

export const addressInfo = [
    {
        id: "Old Value: Hai Phong, Vietnam",
        value: "Old Value: Hai Phong, Vietnam"
    }
];

export const statuses = [
    {
        id: SHIPMENT_STATUS.INPROGRESS,
        num: 1
    },
    {
        id: SHIPMENT_STATUS.PENDING,
        num: 2
    }
];

export const statusOptions = [
    {
        key: SHIPMENT_STATUS.IN_PROGRESS,
        value: SHIPMENT_STATUS.IN_PROGRESS
    },
    {
        key: SHIPMENT_STATUS.PENDING,
        value: SHIPMENT_STATUS.PENDING
    },
    {
        key: SHIPMENT_STATUS.STUCK,
        value: SHIPMENT_STATUS.STUCK
    },
    {
        key: SHIPMENT_STATUS.DONE,
        value: SHIPMENT_STATUS.DONE
    }
]

export const shipmentTasks = [
    {
        id: 'bd-1',
        name: 'Booking details 1',
        events: [
            {
                name: 'Booking confirmed',
                done: false,
                pin: true,
                linkContent: 'Linked issue: Late arrival because of the weather',
                partners: [
                    {
                        id: 1,
                        code: 'shipper',
                        name: 'Shipper'
                    },
                    {
                        id: 2,
                        code: 'consignee',
                        name: 'Consignee'
                    },
                    {
                        id: 3,
                        code: 'import',
                        name: 'Import Custom'
                    },
                    {
                        id: 4,
                        code: 'export',
                        name: 'Export Custom'
                    },
                    {
                        id: 5,
                        code: 'box-export',
                        name: 'Export Logistics'
                    }
                ],
                status: SHIPMENT_STATUS.PENDING,
                due: {
                    warning: true,
                    date: '2020-07-25',
                    type: 'BC Date'
                }
            },
            {
                name: 'SI cut off date',
                done: false,
                pin: false,
                linkContent: 'Linked issue: Late arrival because of the weather',
                partners: [
                    {
                        id: 1,
                        code: 'ship',
                        name: 'Freight'
                    }
                ]
            }
        ],
        documents: [
            {
                name: 'Upload booking confirmation doc',
                done: false,
                pin: true,
                linkContent: 'Linked issue: Late arrival because of the weather',
                partners: [
                    {
                        id: 1,
                        code: 'shipper',
                        name: 'Shipper'
                    },
                    {
                        id: 2,
                        code: 'consignee',
                        name: 'Consignee'
                    },
                    {
                        id: 3,
                        code: 'import',
                        name: 'Import Custom'
                    },
                    {
                        id: 4,
                        code: 'ship',
                        name: 'Freight'
                    },
                    {
                        id: 5,
                        code: 'box-import',
                        name: 'Import Logistics'
                    }
                ],
                assignees: organizationMembersList,
                status: SHIPMENT_STATUS.INPROGRESS,
                assignee: organizationMembersList[0],
                due: {
                    warning: false,
                    date: '2020-07-25',
                    type: 'BC Date'
                }
            }
        ]
    },
    {
        id: 'bd-2',
        name: 'Booking details 2',
        events: [
            {
                name: 'Booking confirmed',
                done: false,
                pin: true,
                linkContent: 'Linked issue: Late arrival because of the weather',
                partners: [
                    {
                        id: 1,
                        code: 'shipper',
                        name: 'Shipper'
                    },
                    {
                        id: 2,
                        code: 'consignee',
                        name: 'Consignee'
                    },
                    {
                        id: 3,
                        code: 'import',
                        name: 'Import Custom'
                    },
                    {
                        id: 4,
                        code: 'export',
                        name: 'Export Custom'
                    },
                    {
                        id: 5,
                        code: 'box-export',
                        name: 'Export Logistics'
                    }
                ],
                status: SHIPMENT_STATUS.PENDING,
                due: {
                    warning: true,
                    date: '2020-07-25',
                    type: 'BC Date'
                }
            },
            {
                name: 'SI cut off date',
                done: false,
                pin: false,
                linkContent: 'Linked issue: Late arrival because of the weather',
                partners: [
                    {
                        id: 1,
                        code: 'ship',
                        name: 'Freight'
                    }
                ]
            }
        ],
        documents: [
            {
                name: 'Upload booking confirmation doc',
                done: false,
                pin: true,
                linkContent: 'Linked issue: Late arrival because of the weather',
                partners: [
                    {
                        id: 1,
                        code: 'shipper',
                        name: 'Shipper'
                    },
                    {
                        id: 2,
                        code: 'consignee',
                        name: 'Consignee'
                    },
                    {
                        id: 3,
                        code: 'import',
                        name: 'Import Custom'
                    },
                    {
                        id: 4,
                        code: 'ship',
                        name: 'Freight'
                    },
                    {
                        id: 5,
                        code: 'box-import',
                        name: 'Import Logistics'
                    }
                ],
                assignees: organizationMembersList,
                status: SHIPMENT_STATUS.INPROGRESS,
                assignee: organizationMembersList[0],
                due: {
                    warning: false,
                    date: '2020-07-25',
                    type: 'BC Date'
                }
            }
        ]
    },
    {
        id: 'bd-3',
        name: 'Booking details 3',
        events: [
            {
                name: 'Booking confirmed',
                done: false,
                pin: true,
                linkContent: 'Linked issue: Late arrival because of the weather',
                partners: [
                    {
                        id: 1,
                        code: 'shipper',
                        name: 'Shipper'
                    },
                    {
                        id: 2,
                        code: 'consignee',
                        name: 'Consignee'
                    },
                    {
                        id: 3,
                        code: 'import',
                        name: 'Import Custom'
                    },
                    {
                        id: 4,
                        code: 'export',
                        name: 'Export Custom'
                    },
                    {
                        id: 5,
                        code: 'box-export',
                        name: 'Export Logistics'
                    }
                ],
                status: SHIPMENT_STATUS.PENDING,
                due: {
                    warning: true,
                    date: '2020-07-25',
                    type: 'BC Date'
                }
            },
            {
                name: 'SI cut off date',
                done: false,
                pin: false,
                linkContent: 'Linked issue: Late arrival because of the weather',
                partners: [
                    {
                        id: 1,
                        code: 'ship',
                        name: 'Freight'
                    }
                ]
            }
        ],
        documents: [
            {
                name: 'Upload booking confirmation doc',
                done: false,
                pin: true,
                linkContent: 'Linked issue: Late arrival because of the weather',
                partners: [
                    {
                        id: 1,
                        code: 'shipper',
                        name: 'Shipper'
                    },
                    {
                        id: 2,
                        code: 'consignee',
                        name: 'Consignee'
                    },
                    {
                        id: 3,
                        code: 'import',
                        name: 'Import Custom'
                    },
                    {
                        id: 4,
                        code: 'ship',
                        name: 'Freight'
                    },
                    {
                        id: 5,
                        code: 'box-import',
                        name: 'Import Logistics'
                    }
                ],
                assignees: organizationMembersList,
                status: SHIPMENT_STATUS.INPROGRESS,
                assignee: organizationMembersList[0],
                due: {
                    warning: false,
                    date: '2020-07-25',
                    type: 'BC Date'
                }
            }
        ]
    }
];

export const documentTable = [
    {
        id: 'doc1',
        favorite : true,
        noDocs: 1,
        uploader: {
            name: 'Edith Pittman',
            date: '21 Jul 2020, 12:35 PM'
        },
        type: 'Master Bill of Lading',
        assignees: organizationMembersList
    },
    {
        id: 'doc2',
        favorite : true,
        noDocs: 3,
        uploader: {
            name: 'Leonard Morton',
            date: '21 Jul 2020, 12:35 PM'
        },
        type: 'Booking Bill of Lading',
        assignees: []
    },
    {
        id: 'doc3',
        type: 'Packing list',
        favorite : false,
        noDocs: 3,
        uploader: {
            name: 'Blanche Cannon',
            date: '21 Jul 2020, 12:35 PM'
        },
        assignees: organizationMembersList
    },
    {
        id: 'doc4',
        type: 'House bill of lading',
        favorite : false,
        noDocs: 1,
        uploader: {
            name: 'Roger McCoy',
            date: '21 Jul 2020, 12:35 PM'
        },
        assignees: organizationMembersList
    }
];

export const extractedInfo = [
            {
               title: 'Tax Invoice gerneral',
               details : [
                {
                    id: 1,
                    name : 'Documnent no.',
                    number: '94300331575'
                },
                {
                    id: 2,
                    name : 'Date',
                    number: '13/10/2020'
                },
                {
                    id: 3,
                    name : 'Due Date',
                    number: '25/11/2020'
                },
               ]
            },
            {
                title: 'Customer Details',
                details : [
                 {
                     id: 1,
                     name : 'Customer',
                     number: 'CAE0010'
                 },
                 {
                    id: 2,
                    name : 'Tel',
                    number: '97128087110'
                },
                {
                    id: 3,
                    name : 'Ship-to',
                    number: 'VAE0001'
                },
                ]
             },
             {
                title: 'Oder Details',
                details : [
                 {
                     id: 1,
                     name : 'Customer PO NO.',
                     number: '52001600083'
                 },
                 {
                    id: 2,
                    name : 'Date',
                    number: '20/08/2020'
                },
                {
                    id: 3,
                    name : 'Order no.',
                    number: '222805768'
                },
                ]
             },
        ]

export const bookingList = [
    {
        referenceNo : random(111111111, 999999999),
        bookingNo : random(11111111, 99999999),
        portLoading : 'SGSIN',
        portDischarge: 'AUMED',
        placeReceipt: 'Singapore port',
        placeDelivery: 'Australlia port',
        dateReceipt: '17 Oct 2020',
        createdDate: '14 Oct 2020',
        status: 'submitted',
        members: [
            ...organizationMembersList,
            ...organizationMembersList.slice(0, 4)
        ],
        comments : {
            count : 3,
            label : 'comment'
        }
    },
    {
        referenceNo : random(111111111, 999999999),
        bookingNo : random(11111111, 99999999),
        portLoading : 'SGSIN',
        portDischarge: 'AUMED',
        placeReceipt: 'Singapore port',
        placeDelivery: 'Australlia port',
        dateReceipt: '26 Oct 2020',
        createdDate: '10 Oct 2020',
        status: 'draft',
        members: [
            ...organizationMembersList,
            ...organizationMembersList.slice(0, 4)
        ],
        comments : {
            count : 5,
            label : 'comment'
        }
    },
    {
        referenceNo : random(111111111, 999999999),
        bookingNo : random(11111111, 99999999),
        portLoading : 'SGSIN',
        portDischarge: 'AUMED',
        placeReceipt: 'Singapore port',
        placeDelivery: 'Australlia port',
        dateReceipt: '30 Oct 2020',
        createdDate: '13 Oct 2020',
        status: 'confirmed',
        members: [
            ...organizationMembersList,
            ...organizationMembersList.slice(0, 4)
        ],
        comments : {
            count : 3,
            label : 'comment'
        }
    },
    {
        referenceNo : random(111111111, 999999999),
        bookingNo : random(11111111, 99999999),
        portLoading : 'SGSIN',
        portDischarge: 'AUMED',
        placeReceipt: 'Singapore port',
        placeDelivery: 'Australlia port',
        dateReceipt: '04 Nov 2020',
        createdDate: '22 Oct 2020',
        status: 'cancelled',
        members: [
            ...organizationMembersList,
            ...organizationMembersList.slice(0, 4)
        ],
        comments : {
            count : 5,
            label : 'comment'
        }
    },
    {
        referenceNo : random(111111111, 999999999),
        bookingNo : random(11111111, 99999999),
        portLoading : 'SGSIN',
        portDischarge: 'AUMED',
        placeReceipt: 'Singapore port',
        placeDelivery: 'Australlia port',
        dateReceipt: '12 Nov 2020',
        createdDate: '24 Oct 2020',
        status: 'rejected',
        members: [
            ...organizationMembersList,
            ...organizationMembersList.slice(0, 4)
        ],
        comments : {
            count : 5,
            label : 'comment'
        }
    }
]

const issueComments = [
    {
        avatar,
        user: 'Francis Ball',
        date: '11 Aug 2020, 5:14 PM',
        content: `
            <p>Can you please stuff earlt so that we can leave your warehouse as soon as possible because only 1 day left for gate in and also is simply dummy text of the printing and typesetting industry.</p>
            <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially</p>
        `,
        gallery: [
            ooclLogo,
            cmaLogo,
            maersklineLogo
        ]
    },
    {
        avatar,
        user: 'Lawrence Jennings',
        date: '11 Aug 2020, 5:14 PM',
        content: `
            <p>Can you please stuff earlt so that we can leave your warehouse as soon as possible because only 1 day left for gate in and also is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially</p>
        `,
    }
];
export const referenceList = [
    {
        createdBy: organizationMembersList[0],
        comments: [
            {
                avatar,
                user: 'Florence Wade',
                date: '8 Aug 2020, 06:15 PM',
                content: `
                    <p>Sed ut persipiciats ude omnis iste natus error sit voluptatern accusantium doloremque laudantium,</p>
                    <p>totam rem aperiam, eaque ipsa quae ab illo inventore veryiatis et quasi architecto beartea vitae dicta sunt</p>
                    <p>explicabo. Nemo enim ipam voluptaterm quia voluptas sit aspernatur aut odit aut fugit.</p>
                `,
                gallery: [
                    ooclLogo,
                    cmaLogo,
                    maersklineLogo
                ]
            },
            {
                avatar,
                user: 'Anna Doe',
                date: '8 Aug 2020, 6;15 PM',
                content: `
                    <p>Sed ut perspiciats unde omnis iste natus erroe sit voluptaterm accusantium doloremque laudantium.</p>
                `,
            }
        ]
    },
];
export const activityReference = [
    {
        activities: [
            {
                name: 'Jack Smith',
                createdBy: organizationMembersList[0],
                content: 'created this request',
                time: '08/10/2020 | 4:30 PM',
            },
            {
                name: 'James Doe',
                createdBy: organizationMembersList[0],
                content: 'made changes',
                time: '08/10/2020 | 4:30 PM',
            },
        ],
        feild: 'Date of receipt',
        originalValue: '31 Aug 2020',
        newValue: '18 Sep 2020'
    }
]
export const issuesList = [
    {
        activity : [
            {
                name : "SGSIN-AUSYD-25092019 (1234)",
                note: "Direct LCL with Bill of Lading",
                icon: "icon-ship"
            }
        ],
        unread: true,
        icon: 'icon-warning',
        title: 'Arriving vessel is get delayed by 4 days because of weather',
        sub: 'If its urgent shipment then Booking party can do the new booking and we will not charge...',
        members: [
            ...organizationMembersList,
            ...organizationMembersList.slice(0, 4)
        ],
        date: '28 Jul 2020 15:26',
        event: 'Created on',
        comments: issueComments,
        createdBy: organizationMembersList[0]
    },
    {
        activity : [
            {
                name : "SGSIN-AUSYD-25092019 (1234)",
                note: "Direct LCL with Bill of Lading",
                icon: "icon-ship"
            }
        ],
        unread: true,
        icon: 'icon-warning',
        title: 'Shipment booking',
        sub: 'If its urgent shipment then Booking party can do the new booking and we will not charge...',
        members: [
            ...organizationMembersList.slice(0, 3)
        ],
        date: '28 Jul 2020 15:26',
        event: 'Last updated',
        comments: issueComments,
        createdBy: organizationMembersList[0]
    },
    {
        activity : [
            {
                name : "SGSIN-AUSYD-25092019 (1234)",
                note: "Direct LCL with Bill of Lading",
                icon: "icon-ship"
            }
        ],
        unread: false,
        icon: 'icon-check',
        title: 'Your antibiotic One Day To 10 Day Options',
        sub: 'Writing A Good Headline For Your Advertisement',
        members: [
            ...organizationMembersList.slice(0, 7)
        ],
        date: '28 Jul 2020 15:26',
        event: 'Closed on',
        comments: issueComments,
        createdBy: organizationMembersList[0],
        closedBy: {
            avatar,
            name: 'Jack Smith',
            date: '08 August 2020 | 12:30 PM'
        }
    },
    {
        activity : [
            {
                name : "SGSIN-AUSYD-25092019 (1234)",
                note: "Direct LCL with Bill of Lading",
                icon: "icon-ship"
            }
        ],
        unread: false,
        icon: 'icon-check',
        title: 'Methods That Aid In Eczema Relief',
        sub: 'Why Do You Need To Join An Affiliate Marketing Network',
        members: [
            ...organizationMembersList.slice(0, 5)
        ],
        date: '28 Jul 2020 15:26',
        event: 'Closed on',
        comments: issueComments,
        createdBy: organizationMembersList[0],
        closedBy: {
            avatar,
            name: 'Hannah Sarapovah',
            date: '08 August 2020 | 12:30 PM'
        }
    },
    {
        activity : [
            {
                name : "SGSIN-AUSYD-25092019 (1234)",
                note: "Direct LCL with Bill of Lading",
                icon: "icon-ship"
            }
        ],
        unread: true,
        icon: 'icon-warning',
        title: 'Your Prescription For Sinus Headache Reflief',
        sub: 'Get Best ADvertiser In Your Side Pocket',
        members: [
            ...organizationMembersList.slice(0, 1)
        ],
        date: '28 Jul 2020 15:26',
        event: 'Last updated',
        comments: issueComments,
        createdBy: organizationMembersList[0]
    },
    {
        activity : [
            {
                name : "SGSIN-AUSYD-25092019 (1234)",
                note: "Direct LCL with Bill of Lading",
                icon: "icon-ship"
            }
        ],
        unread: false,
        icon: 'icon-check',
        title: 'Make Menopause The Alternative Anti Aging Approach',
        sub: 'Free Classifieds Using Them To Promote Your Stuff Online',
        members: [
            ...organizationMembersList.slice(0, 5)
        ],
        date: '28 Jul 2020 15:26',
        event: 'Closed on',
        comments: [],
        createdBy: organizationMembersList[0],
        closedBy: {
            avatar,
            name: 'John Doe',
            date: '08 August 2020 | 12:30 PM'
        }
    }
];

export const dueDates = [
    {
        id: 'specific-date',
        name: 'Specific date'
    },
    {
        id: 'event-based-date',
        name: 'Event based date'
    }
];

export const documentsList = [
    {
        id: 'doc1',
        name: 'bookingconfirm_v1.pdf',
        uploader: {
            name: 'Edith Pittman',
            date: '21 Jul 2020, 12:35 PM'
        },
        assignees: organizationMembersList
    },
    {
        id: 'doc2',
        name: 'bookingconfirm_v2.pdf',
        uploader: {
            name: 'Leonard Morton',
            date: '21 Jul 2020, 12:35 PM'
        },
        assignees: organizationMembersList
    },
    {
        id: 'doc3',
        name: 'bookingconfirm_v3.pdf',
        uploader: {
            name: 'Blanche Cannon',
            date: '21 Jul 2020, 12:35 PM'
        },
        assignees: organizationMembersList
    },
    {
        id: 'doc4',
        name: 'bookingconfirm_v4.pdf',
        uploader: {
            name: 'Blanche Cannon',
            date: '21 Jul 2020, 12:35 PM'
        },
        assignees: organizationMembersList
    }
];

export const invoices = [
    {
        no: '9430019971',
        goods: [
            {
                type: 'Chocolate',
                date: '28182020',
                status: 'Filled',
                documents: [
                    {
                        name: 'Aesean-Kora free Trading Area Cerificate of Origin , From AK'
                    },
                    {
                        name: 'Movement document for transboundary movements or shipment of waste'
                    },
                    {
                        name: 'Notification document for transboundary movements or shipment of waste'
                    }

                ],
                groups: [
                    {
                        name: 'Default',
                        duty: '5% of CIF',
                        details: [
                            {
                                name: 'Social welfare surcharge',
                                value: '10% of (custom duty + special exercise duty + ...)'
                            },
                            {
                                name: 'Service tax',
                                value: '10% of (custom duty + ...)'
                            }
                        ]
                    },
                    {
                        name: 'SINGAPORE - ASEAN',
                        duty: '5% of CIF',
                        details: [
                            {
                                name: 'Social welfare surcharge',
                                value: '10% of (custom duty + special exercise duty + ...)'
                            },
                            {
                                name: 'Service tax',
                                value: '10% of (custom duty + ...)'
                            }
                        ],
                        price: 1000,
                        currency: 'USD'
                    },
                    {
                        name: 'Sample FTA',
                        duty: '10% of CIF',
                        details: [
                            {
                                name: 'Social welfare surcharge',
                                value: '10% of (custom duty + special exercise duty + ...)'
                            },
                            {
                                name: 'Service tax',
                                value: '10% of (custom duty + ...)'
                            }
                        ],
                        price: 5000,
                        currency: 'USD'
                    }
                ]
            },
            {
                type: 'Candy',
                date: '28182020',
                status: 'Filled',
                documents: [
                    {
                        name: 'Aesean-Kora free Trading Area Cerificate of Origin , From AK'
                    },
                    {
                        name: 'Movement document for transboundary movements or shipment of waste'
                    },
                    {
                        name: 'Notification document for transboundary movements or shipment of waste'
                    }

                ],
                groups: [
                    {
                        name: 'Default',
                        duty: '5% of CIF',
                        details: [
                            {
                                name: 'Social welfare surcharge',
                                value: '10% of (custom duty + special exercise duty + ...)'
                            },
                            {
                                name: 'Service tax',
                                value: '10% of (custom duty + ...)'
                            }
                        ]
                    },
                    {
                        name: 'Sample FTA',
                        duty: '10% of CIF',
                        details: [
                            {
                                name: 'Social welfare surcharge',
                                value: '10% of (custom duty + special exercise duty + ...)'
                            },
                            {
                                name: 'Service tax',
                                value: '10% of (custom duty + ...)'
                            }
                        ],
                        price: 5000,
                        currency: 'USD'
                    }
                ]
            }
        ]
    },
    {
        no: '9430019872',
        goods: [
            {
                date: '28182020',
                status: 'Filled',
                documents: [
                    {
                        name: 'Aesean-Kora free Trading Area Cerificate of Origin , From AK'
                    },
                    {
                        name: 'Movement document for transboundary movements or shipment of waste'
                    },
                    {
                        name: 'Notification document for transboundary movements or shipment of waste'
                    }

                ],
                groups: [
                    {
                        name: 'Default',
                        duty: '5% of CIF',
                        details: [
                            {
                                name: 'Social welfare surcharge',
                                value: '10% of (custom duty + special exercise duty + ...)'
                            },
                            {
                                name: 'Service tax',
                                value: '10% of (custom duty + ...)'
                            }
                        ]
                    },
                    {
                        name: 'Sample FTA',
                        duty: '10% of CIF',
                        details: [
                            {
                                name: 'Social welfare surcharge',
                                value: '10% of (custom duty + special exercise duty + ...)'
                            },
                            {
                                name: 'Service tax',
                                value: '10% of (custom duty + ...)'
                            }
                        ],
                        price: 5000,
                        currency: 'USD'
                    }
                ]
            }
        ]
    }
];

export const documentModal = Array(3).fill([
    {
        key: 'Category',
        value: 'Trade Aggreement Document'
    },
    {
        key: 'Code',
        value: 'AD_IMP_GSPID.pdf'
    },
    {
        key: 'Notes',
        value: 'As an alternative to the Certificate of Origin Form A, an invoice Declaration may be used instead for approved exporters or for consignments of up to EUR 6000. The invoice Declaration consists of a Declaration given on the commercial invoice. It may also be given on the packing list, consignment note or other commercial document.'
    },
    {
        key: 'Name',
        value: 'Invoice Declaration (GSP - General arrangements)'
    },
    {
        key: 'Responsible Party',
        value: 'Exportor'
    },
    {
        key: 'Source',
        value: 'Council Decision of 26 November 1990 on the conclusion of the agreement in the form of an exchange of letters between the EEC and Andorra; Regilation (EC) No 2454/93 (OJ L 253).'
    }
]);

export const shipmentLogs = [
    {
        name: 'Florence Wade',
        email: 'florencewade0@gmail.com',
        activity: 'Florence Wade uploaded document for “Upload shipping note”.',
        dateTime: '12 Jul 2020 | 03: 40 AM'
    },
    {
        name: 'Florence Wade',
        email: 'florencewade0@gmail.com',
        activity: 'Florence Wade created SGSIN-AUSYD-25092019 (1234).',
        dateTime: '12 Jul 2020 | 03: 40 AM'
    }
];

export const breadcrumsMock = {
    vesselScheduleResults: [
        {
            name: 'Vessel Schedule',
            url: VESSEL_SCHEDULE_URL
        },
        {
            name: 'Search Schedule',
            url: VESSEL_SCHEDULE_RESULTS_URL
        }
    ],
    activeShipmentDetails: [
        {
            name: 'Active Shipments',
            url: ACTIVE_SHIPMENTS_URL
        },
        {
            name: 'SGSIN-AUSYD-25092019',
            url: ACTIVE_SHIPMENT_DETAILS_URL.replace(':shipmentId', 'as1')
        }
    ],
    archiveDetails: [
        {
            name: 'Archive',
            url: ARCHIVE_URL
        },
        {
            name: 'SGSIN-AUSYD-25092019',
            url: ARCHIVE_DETAILS_URL.replace(':shipmentId', 'as1')
        }
    ],
    organizationDetails: [
        {
            name: 'Organizations',
            url: ORGANIZATIONS_URL
        },
        {
            name: 'Trames Pte. Ltd.',
            url: ORGANIZATIONS_DETAILS_URL.replace(':orgId', 'org1')
        }
    ],
    organizationTeamDetails: [
        {
            name: 'Organizations',
            url: ORGANIZATIONS_URL
        },
        {
            name: 'Trames Pte. Ltd.',
            url: ORGANIZATIONS_DETAILS_URL.replace(':orgId', 'org1')
        },
        {
            name: 'Teams',
            url: TEAMS_URL
        },
        {
            name: 'Shipment Business',
            url: TEAM_DETAILS_URL
        }
    ],
    teamDetails: [
        {
            name: 'Teams',
            url: TEAMS_URL
        },
        {
            name: 'Shipment Business',
            url: TEAM_DETAILS_URL
        }
    ],
    templateDetails: [
        {
            name: 'Templates',
            url: TEMPLATES_URL
        },
        {
            name: 'FCL Shipment',
            url: TEMPLATE_DETAILS_URL.replace(':templateId', 'tem1')
        }
    ],
    otherTemplateDetails: [
        {
            name: 'Other Templates',
            url: OTHER_TEMPLATES_URL
        },
        {
            name: 'FCL Shipment',
            url: OTHER_TEMPLATE_DETAILS_URL.replace(':templateId', 'tem1')
        }
    ],
    addNewRequest: [
        {
            name: 'Booking Request',
            url: BOOKING_REQUEST_URL
        },
        {
            name: 'Add New Request',
            url: ADD_NEW_REQUEST_URL
        }
    ],
    editRequest: [
        {
            name: 'Booking Request',
            url: BOOKING_REQUEST_URL
        }
    ],
    shipmentDetails: [
        {
            name: 'Home',
            url: TRACK_SHIPMENT_URL
        },
        {
            name: 'Create new shipment',
            url: SHIPMENT_DETAILS
        }
    ]
};

export const carrierValues = [
    {
        id: 'c1',
        description: 'COSCO SHIPPING Lines Pte Ltd'
    },
    {
        id: 'c2',
        description: 'MAGNA SHIPPING Lines Pte Ltd',
    },
    {
        id: 'c3',
        description: 'ANDREA SHIPPING Lines Pte Ltd'
    },
    {
        id: 'c4',
        description: 'SHIZUKA SHIPPING Lines Pte Ltd',
    },
];

export const bookingNoOptions = [
    {
        id: 'b1',
        description: 'No.: 5583720028'
    },
    {
        id: 'b2',
        description: 'No.: 7683720032'
    }
];

export const shipmentTasksFCL = [
    {
        name: 'Booking details',
        events: [
            {
                name: 'Booking confirmed',
                done: false,
                pin: true,
                linkContent: 'Linked issue: Late arrival because of the weather',
                partners: [
                    {
                        id: 1,
                        code: 'shipper',
                        name: 'Shipper'
                    },
                    {
                        id: 2,
                        code: 'consignee',
                        name: 'Consignee'
                    },
                    {
                        id: 3,
                        code: 'import',
                        name: 'Import Custom'
                    },
                    {
                        id: 4,
                        code: 'export',
                        name: 'Export Custom'
                    },
                    {
                        id: 5,
                        code: 'box-export',
                        name: 'Export Logistics'
                    }
                ],
                status: SHIPMENT_STATUS.PENDING,
                due: {
                    warning: true,
                    date: '2020-07-25',
                    type: 'BC Date'
                }
            },
            {
                name: 'SI cut off date',
                done: false,
                pin: false,
                linkContent: 'Linked issue: Late arrival because of the weather',
                partners: [
                    {
                        id: 1,
                        code: 'ship',
                        name: 'Freight'
                    }
                ]
            },
            {
                name: 'Empty Container Pick up from Depot',
                done: false,
                pin: false,
                linkContent: 'Linked issue: Late arrival because of the weather',
                partners: [
                    {
                        id: 1,
                        code: 'ship',
                        name: 'Freight'
                    }
                ]
            },
            {
                name: 'Drop off Container at Shipper Warehouse',
                done: false,
                pin: false,
                linkContent: 'Linked issue: Late arrival because of the weather',
                partners: [
                    {
                        id: 1,
                        code: 'ship',
                        name: 'Freight'
                    }
                ]
            },
            {
                name: 'Truck-In to pick up Laden Container',
                done: false,
                pin: false,
                linkContent: 'Linked issue: Late arrival because of the weather',
                partners: [
                    {
                        id: 1,
                        code: 'ship',
                        name: 'Freight'
                    }
                ]
            },
            {
                name: 'Truck-Out with Laden Container',
                done: false,
                pin: false,
                linkContent: 'Linked issue: Late arrival because of the weather',
                partners: [
                    {
                        id: 1,
                        code: 'ship',
                        name: 'Freight'
                    }
                ]
            },
        ],
        documents: [
            {
                name: 'Upload booking confirmation doc',
                done: false,
                pin: true,
                linkContent: 'Linked issue: Late arrival because of the weather',
                partners: [
                    {
                        id: 1,
                        code: 'shipper',
                        name: 'Shipper'
                    },
                    {
                        id: 2,
                        code: 'consignee',
                        name: 'Consignee'
                    },
                    {
                        id: 3,
                        code: 'import',
                        name: 'Import Custom'
                    },
                    {
                        id: 4,
                        code: 'ship',
                        name: 'Freight'
                    },
                    {
                        id: 5,
                        code: 'box-import',
                        name: 'Import Logistics'
                    }
                ],
                assignees: organizationMembersList,
                status: SHIPMENT_STATUS.INPROGRESS,
                assignee: organizationMembersList[0],
                due: {
                    warning: false,
                    date: '2020-07-25',
                    type: 'BC Date'
                }
            }
        ]
    }
];

export const shipmentTasksLCL = [
    {
        name: 'Booking details',
        events: [
            {
                name: 'Booking confirmed',
                done: false,
                pin: true,
                linkContent: 'Linked issue: Late arrival because of the weather',
                partners: [
                    {
                        id: 1,
                        code: 'shipper',
                        name: 'Shipper'
                    },
                    {
                        id: 2,
                        code: 'consignee',
                        name: 'Consignee'
                    },
                    {
                        id: 3,
                        code: 'import',
                        name: 'Import Custom'
                    },
                    {
                        id: 4,
                        code: 'export',
                        name: 'Export Custom'
                    },
                    {
                        id: 5,
                        code: 'box-export',
                        name: 'Export Logistics'
                    }
                ],
                status: SHIPMENT_STATUS.PENDING,
                due: {
                    warning: true,
                    date: '2020-07-25',
                    type: 'BC Date'
                }
            },
            {
                name: 'SI cut off date',
                done: false,
                pin: false,
                linkContent: 'Linked issue: Late arrival because of the weather',
                partners: [
                    {
                        id: 1,
                        code: 'ship',
                        name: 'Freight'
                    }
                ]
            },
            {
                name: 'Truck In to pick up Cargo',
                done: false,
                pin: false,
                linkContent: 'Linked issue: Late arrival because of the weather',
                partners: [
                    {
                        id: 1,
                        code: 'ship',
                        name: 'Freight'
                    }
                ]
            },
            {
                name: 'Stuffing Start',
                done: false,
                pin: false,
                linkContent: 'Linked issue: Late arrival because of the weather',
                partners: [
                    {
                        id: 1,
                        code: 'ship',
                        name: 'Freight'
                    }
                ]
            },
            {
                name: 'Stuffing End',
                done: false,
                pin: false,
                linkContent: 'Linked issue: Late arrival because of the weather',
                partners: [
                    {
                        id: 1,
                        code: 'ship',
                        name: 'Freight'
                    }
                ]
            },
            {
                name: 'Truck out with Cargo',
                done: false,
                pin: false,
                linkContent: 'Linked issue: Late arrival because of the weather',
                partners: [
                    {
                        id: 1,
                        code: 'ship',
                        name: 'Freight'
                    }
                ]
            }
        ],
        documents: [
            {
                name: 'Upload booking confirmation doc',
                done: false,
                pin: true,
                linkContent: 'Linked issue: Late arrival because of the weather',
                partners: [
                    {
                        id: 1,
                        code: 'shipper',
                        name: 'Shipper'
                    },
                    {
                        id: 2,
                        code: 'consignee',
                        name: 'Consignee'
                    },
                    {
                        id: 3,
                        code: 'import',
                        name: 'Import Custom'
                    },
                    {
                        id: 4,
                        code: 'ship',
                        name: 'Freight'
                    },
                    {
                        id: 5,
                        code: 'box-import',
                        name: 'Import Logistics'
                    }
                ],
                assignees: organizationMembersList,
                status: SHIPMENT_STATUS.INPROGRESS,
                assignee: organizationMembersList[0],
                due: {
                    warning: false,
                    date: '2020-07-25',
                    type: 'BC Date'
                }
            }
        ]
    }
];
export const mockDashboard =
    {
        "currentPage": 0,
        "totalPage": 3,
        "totalItems": 3,
        "items": [
            {
                "dueDate": {
                    "specificDate": 123
                },
                "status": {
                    "taskStatus": "PENDING",
                    "updatedStatusBy": "5fc7a8c90b495e000838a251"
                },
                "roles": [
                    "SHIPPER"
                ],
                "_id": "5feaf64153483e5ae42a5af9",
                "sectionId": "5feaf5d8ab7c3a14f447ee81",
                "taskName": "new task 02",
                "type": "DOCUMENT",
                "partners": [
                    {
                        "_id": "5feaf64153483e5ae42a5afa",
                        "id": "5fd03445850f53000976da37",
                        "type": "MEMBER"
                    }
                ],
                "documents": [
                    {
                        "_id": "5feaf64153483e5ae42a5afb",
                        "fileName": "fileName 01",
                        "typeOfDocument": "BC"
                    },
                    {
                        "_id": "5feaf64153483e5ae42a5afc",
                        "fileName": "fileName 02",
                        "typeOfDocument": "BC"
                    }
                ],
                "base": {
                    "delete": false,
                    "_id": "5feaf64153483e5ae42a5afd",
                    "createdDate": 1609233985045,
                    "updatedDate": 1609233985045,
                    "createdBy": "5fd03445850f53000976da37"
                },
                "__v": 0
            },
            {
                "dueDate": {
                    "specificDate": 1609233985045
                },
                "status": {
                    "taskStatus": "PENDING",
                    "updatedStatusBy": "5fc7a8c90b495e000838a251"
                },
                "roles": [
                    "SHIPPER"
                ],
                "_id": "5feaf5f027e0890e249a0f63",
                "sectionId": "5feaf5d8ab7c3a14f447ee81",
                "taskName": "new task 01",
                "type": "DOCUMENT",
                "partners": [
                    {
                        "_id": "5feaf5f027e0890e249a0f64",
                        "id": "5fd03445850f53000976da37",
                        "type": "MEMBER"
                    }
                ],
                "documents": [
                    {
                        "_id": "5feaf5f027e0890e249a0f65",
                        "fileName": "fileName 01",
                        "typeOfDocument": "BC"
                    },
                    {
                        "_id": "5feaf5f027e0890e249a0f66",
                        "fileName": "fileName 02",
                        "typeOfDocument": "BC"
                    }
                ],
                "base": {
                    "delete": false,
                    "_id": "5feaf5f027e0890e249a0f67",
                    "createdDate": 1609233904082,
                    "updatedDate": 1609233904082,
                    "createdBy": "5fd03445850f53000976da37"
                },
                "__v": 0
            },
            {
                "dueDate": {
                    "specificDate": 123
                },
                "status": {
                    "taskStatus": "PENDING",
                    "updatedStatusBy": "5fc7a8c90b495e000838a251"
                },
                "roles": [
                    "SHIPPER"
                ],
                "_id": "5fead2a595a47d3ddc6a1b98",
                "sectionId": "5fead293a3f5762c54a7f6cb",
                "taskName": "new task 01",
                "type": "DOCUMENT",
                "partners": [
                    {
                        "_id": "5fead2a595a47d3ddc6a1b99",
                        "id": "5fd03445850f53000976da37",
                        "type": "MEMBER"
                    }
                ],
                "documents": [
                    {
                        "_id": "5fead2a595a47d3ddc6a1b9a",
                        "fileName": "fileName 01",
                        "typeOfDocument": "BC"
                    },
                    {
                        "_id": "5fead2a595a47d3ddc6a1b9b",
                        "fileName": "fileName 02",
                        "typeOfDocument": "BC"
                    }
                ],
                "base": {
                    "delete": false,
                    "_id": "5fead2a595a47d3ddc6a1b9c",
                    "createdDate": 1609224869800,
                    "updatedDate": 1609224869800,
                    "createdBy": "5fd03445850f53000976da37"
                },
                "__v": 0
            }
        ]
    }

export const ftaOptions = [
    {
        key: '1',
        value: 'HS code'
    },
    {
        key: '2',
        value: 'Good type'
    }
];

export const countryList =[
    {
        name: "Afghanistan",
        locode: "AF"
    },
    {
        name: "Albania",
        locode: "AL"
    },
    {
        name: "Algeria",
        locode: "DZ"
    },
    {
        name: "American Samoa",
        locode: "AS"
    },
    {
        name: "Andorra",
        locode: "AD"
    },
    {
        name: "Angola",
        locode: "AO"
    },
    {
        name: "Anguilla",
        locode: "AI"
    },
    {
        name: "Antarctica",
        locode: "AQ"
    },
    {
        name: "Antigua and Barbuda",
        locode: "AG"
    },
    {
        name: "Argentina",
        locode: "AR"
    },
    {
        name: "Armenia",
        locode: "AM"
    },
    {
        name: "Aruba",
        locode: "AW"
    },
    {
        name: "Australia",
        locode: "AU"
    },
    {
        name: "Austria",
        locode: "AT"
    },
    {
        name: "Azerbaijan",
        locode: "AZ"
    },
    {
        name: "Bahamas",
        locode: "BS"
    },
    {
        name: "Bahrain",
        locode: "BH"
    },
    {
        name: "Bangladesh",
        locode: "BD"
    },
    {
        name: "Barbados",
        locode: "BB"
    },
    {
        name: "Belarus",
        locode: "BY"
    },
    {
        name: "Belgium",
        locode: "BE"
    },
    {
        name: "Belize",
        locode: "BZ"
    },
    {
        name: "Benin",
        locode: "BJ"
    },
    {
        name: "Bermuda",
        locode: "BM"
    },
    {
        name: "Bhutan",
        locode: "BT"
    },
    {
        name: "Bolivia",
        locode: "BO"
    },
    {
        name: "Bosnia and Herzegovina",
        locode: "BA"
    },
    {
        name: "Botswana",
        locode: "BW"
    },
    {
        name: "Brazil",
        locode: "BR"
    },
    {
        name: "British Indian Ocean Territory",
        locode: "IO"
    },
    {
        name: "British Virgin Islands",
        locode: "VG"
    },
    {
        name: "Brunei",
        locode: "BN"
    },
    {
        name: "Bulgaria",
        locode: "BG"
    },
    {
        name: "Burkina Faso",
        locode: "BF"
    },
    {
        name: "Burundi",
        locode: "BI"
    },
    {
        name: "Cambodia",
        locode: "KH"
    },
    {
        name: "Cameroon",
        locode: "CM"
    },
    {
        name: "Canada",
        locode: "CA"
    },
    {
        name: "Cape Verde",
        locode: "CV"
    },
    {
        name: "Cayman Islands",
        locode: "KY"
    },
    {
        name: "Central African Republic",
        locode: "CF"
    },
    {
        name: "Chad",
        locode: "TD"
    },
    {
        name: "Chile",
        locode: "CL"
    },
    {
        name: "China",
        locode: "CN"
    },
    {
        name: "Christmas Island",
        locode: "CX"
    },
    {
        name: "Cocos Islands",
        locode: "CC"
    },
    {
        name: "Colombia",
        locode: "CO"
    },
    {
        name: "Comoros",
        locode: "KM"
    },
    {
        name: "Cook Islands",
        locode: "CK"
    },
    {
        name: "Costa Rica",
        locode: "CR"
    },
    {
        name: "Croatia",
        locode: "HR"
    },
    {
        name: "Cuba",
        locode: "CU"
    },
    {
        name: "Curacao",
        locode: "CW"
    },
    {
        name: "Cyprus",
        locode: "CY"
    },
    {
        name: "Czech Republic",
        locode: "CZ"
    },
    {
        name: "Democratic Republic of the Congo",
        locode: "CD"
    },
    {
        name: "Denmark",
        locode: "DK"
    },
    {
        name: "Djibouti",
        locode: "DJ"
    },
    {
        name: "Dominica",
        locode: "DM"
    },
    {
        name: "Dominican Republic",
        locode: "DO"
    },
    {
        name: "East Timor",
        locode: "TL"
    },
    {
        name: "Ecuador",
        locode: "EC"
    },
    {
        name: "Egypt",
        locode: "EG"
    },
    {
        name: "El Salvador",
        locode: "SV"
    },
    {
        name: "Equatorial Guinea",
        locode: "GQ"
    },
    {
        name: "Eritrea",
        locode: "ER"
    },
    {
        name: "Estonia",
        locode: "EE"
    },
    {
        name: "Ethiopia",
        locode: "ET"
    },
    {
        name: "Falkland Islands",
        locode: "FK"
    },
    {
        name: "Faroe Islands",
        locode: "FO"
    },
    {
        name: "Fiji",
        locode: "FJ"
    },
    {
        name: "Finland",
        locode: "FI"
    },
    {
        name: "France",
        locode: "FR"
    },
    {
        name: "French Polynesia",
        locode: "PF"
    },
    {
        name: "Gabon",
        locode: "GA"
    },
    {
        name: "Gambia",
        locode: "GM"
    },
    {
        name: "Georgia",
        locode: "GE"
    },
    {
        name: "Germany",
        locode: "DE"
    },
    {
        name: "Ghana",
        locode: "GH"
    },
    {
        name: "Gibraltar",
        locode: "GI"
    },
    {
        name: "Greece",
        locode: "GR"
    },
    {
        name: "Greenland",
        locode: "GL"
    },
    {
        name: "Grenada",
        locode: "GD"
    },
    {
        name: "Guam",
        locode: "GU"
    },
    {
        name: "Guatemala",
        locode: "GT"
    },
    {
        name: "Guernsey",
        locode: "GG"
    },
    {
        name: "Guinea",
        locode: "GN"
    },
    {
        name: "Guinea-Bissau",
        locode: "GW"
    },
    {
        name: "Guyana",
        locode: "GY"
    },
    {
        name: "Haiti",
        locode: "HT"
    },
    {
        name: "Honduras",
        locode: "HN"
    },
    {
        name: "Hong Kong",
        locode: "HK"
    },
    {
        name: "Hungary",
        locode: "HU"
    },
    {
        name: "Iceland",
        locode: "IS"
    },
    {
        name: "India",
        locode: "IN"
    },
    {
        name: "Indonesia",
        locode: "ID"
    },
    {
        name: "Iran",
        locode: "IR"
    },
    {
        name: "Iraq",
        locode: "IQ"
    },
    {
        name: "Ireland",
        locode: "IE"
    },
    {
        name: "Isle of Man",
        locode: "IM"
    },
    {
        name: "Israel",
        locode: "IL"
    },
    {
        name: "Italy",
        locode: "IT"
    },
    {
        name: "Ivory Coast",
        locode: "CI"
    },
    {
        name: "Jamaica",
        locode: "JM"
    },
    {
        name: "Japan",
        locode: "JP"
    },
    {
        name: "Jersey",
        locode: "JE"
    },
    {
        name: "Jordan",
        locode: "JO"
    },
    {
        name: "Kazakhstan",
        locode: "KZ"
    },
    {
        name: "Kenya",
        locode: "KE"
    },
    {
        name: "Kiribati",
        locode: "KI"
    },
    {
        name: "Kosovo",
        locode: "XK"
    },
    {
        name: "Kuwait",
        locode: "KW"
    },
    {
        name: "Kyrgyzstan",
        locode: "KG"
    },
    {
        name: "Laos",
        locode: "LA"
    },
    {
        name: "Latvia",
        locode: "LV"
    },
    {
        name: "Lebanon",
        locode: "LB"
    },
    {
        name: "Lesotho",
        locode: "LS"
    },
    {
        name: "Liberia",
        locode: "LR"
    },
    {
        name: "Libya",
        locode: "LY"
    },
    {
        name: "Liechtenstein",
        locode: "LI"
    },
    {
        name: "Lithuania",
        locode: "LT"
    },
    {
        name: "Luxembourg",
        locode: "LU"
    },
    {
        name: "Macau",
        locode: "MO"
    },
    {
        name: "Macedonia",
        locode: "MK"
    },
    {
        name: "Madagascar",
        locode: "MG"
    },
    {
        name: "Malawi",
        locode: "MW"
    },
    {
        name: "Malaysia",
        locode: "MY"
    },
    {
        name: "Maldives",
        locode: "MV"
    },
    {
        name: "Mali",
        locode: "ML"
    },
    {
        name: "Malta",
        locode: "MT"
    },
    {
        name: "Marshall Islands",
        locode: "MH"
    },
    {
        name: "Mauritania",
        locode: "MR"
    },
    {
        name: "Mauritius",
        locode: "MU"
    },
    {
        name: "Mayotte",
        locode: "YT"
    },
    {
        name: "Mexico",
        locode: "MX"
    },
    {
        name: "Micronesia",
        locode: "FM"
    },
    {
        name: "Moldova",
        locode: "MD"
    },
    {
        name: "Monaco",
        locode: "MC"
    },
    {
        name: "Mongolia",
        locode: "MN"
    },
    {
        name: "Montenegro",
        locode: "ME"
    },
    {
        name: "Montserrat",
        locode: "MS"
    },
    {
        name: "Morocco",
        locode: "MA"
    },
    {
        name: "Mozambique",
        locode: "MZ"
    },
    {
        name: "Myanmar",
        locode: "MM"
    },
    {
        name: "Namibia",
        locode: "NA"
    },
    {
        name: "Nauru",
        locode: "NR"
    },
    {
        name: "Nepal",
        locode: "NP"
    },
    {
        name: "Netherlands",
        locode: "NL"
    },
    {
        name: "Netherlands Antilles",
        locode: "AN"
    },
    {
        name: "New Caledonia",
        locode: "NC"
    },
    {
        name: "New Zealand",
        locode: "NZ"
    },
    {
        name: "Nicaragua",
        locode: "NI"
    },
    {
        name: "Niger",
        locode: "NE"
    },
    {
        name: "Nigeria",
        locode: "NG"
    },
    {
        name: "Niue",
        locode: "NU"
    },
    {
        name: "North Korea",
        locode: "KP"
    },
    {
        name: "Northern Mariana Islands",
        locode: "MP"
    },
    {
        name: "Norway",
        locode: "NO"
    },
    {
        name: "Oman",
        locode: "OM"
    },
    {
        name: "Pakistan",
        locode: "PK"
    },
    {
        name: "Palau",
        locode: "PW"
    },
    {
        name: "Palestine",
        locode: "PS"
    },
    {
        name: "Panama",
        locode: "PA"
    },
    {
        name: "Papua New Guinea",
        locode: "PG"
    },
    {
        name: "Paraguay",
        locode: "PY"
    },
    {
        name: "Peru",
        locode: "PE"
    },
    {
        name: "Philippines",
        locode: "PH"
    },
    {
        name: "Pitcairn",
        locode: "PN"
    },
    {
        name: "Poland",
        locode: "PL"
    },
    {
        name: "Portugal",
        locode: "PT"
    },
    {
        name: "Puerto Rico",
        locode: "PR"
    },
    {
        name: "Qatar",
        locode: "QA"
    },
    {
        name: "Republic of the Congo",
        locode: "CG"
    },
    {
        name: "Reunion",
        locode: "RE"
    },
    {
        name: "Romania",
        locode: "RO"
    },
    {
        name: "Russia",
        locode: "RU"
    },
    {
        name: "Rwanda",
        locode: "RW"
    },
    {
        name: "Saint Barthelemy",
        locode: "BL"
    },
    {
        name: "Saint Helena",
        locode: "SH"
    },
    {
        name: "Saint Kitts and Nevis",
        locode: "KN"
    },
    {
        name: "Saint Lucia",
        locode: "LC"
    },
    {
        name: "Saint Martin",
        locode: "MF"
    },
    {
        name: "Saint Pierre and Miquelon",
        locode: "PM"
    },
    {
        name: "Saint Vincent and the Grenadines",
        locode: "VC"
    },
    {
        name: "Samoa",
        locode: "WS"
    },
    {
        name: "San Marino",
        locode: "SM"
    },
    {
        name: "Sao Tome and Principe",
        locode: "ST"
    },
    {
        name: "Saudi Arabia",
        locode: "SA"
    },
    {
        name: "Senegal",
        locode: "SN"
    },
    {
        name: "Serbia",
        locode: "RS"
    },
    {
        name: "Seychelles",
        locode: "SC"
    },
    {
        name: "Sierra Leone",
        locode: "SL"
    },
    {
        name: "Singapore",
        locode: "SG"
    },
    {
        name: "Sint Maarten",
        locode: "SX"
    },
    {
        name: "Slovakia",
        locode: "SK"
    },
    {
        name: "Slovenia",
        locode: "SI"
    },
    {
        name: "Solomon Islands",
        locode: "SB"
    },
    {
        name: "Somalia",
        locode: "SO"
    },
    {
        name: "South Africa",
        locode: "ZA"
    },
    {
        name: "South Korea",
        locode: "KR"
    },
    {
        name: "South Sudan",
        locode: "SS"
    },
    {
        name: "Spain",
        locode: "ES"
    },
    {
        name: "Sri Lanka",
        locode: "LK"
    },
    {
        name: "Sudan",
        locode: "SD"
    },
    {
        name: "Suriname",
        locode: "SR"
    },
    {
        name: "Svalbard and Jan Mayen",
        locode: "SJ"
    },
    {
        name: "Swaziland",
        locode: "SZ"
    },
    {
        name: "Sweden",
        locode: "SE"
    },
    {
        name: "Switzerland",
        locode: "CH"
    },
    {
        name: "Syria",
        locode: "SY"
    },
    {
        name: "Taiwan",
        locode: "TW"
    },
    {
        name: "Tajikistan",
        locode: "TJ"
    },
    {
        name: "Tanzania",
        locode: "TZ"
    },
    {
        name: "Thailand",
        locode: "TH"
    },
    {
        name: "Togo",
        locode: "TG"
    },
    {
        name: "Tokelau",
        locode: "TK"
    },
    {
        name: "Tonga",
        locode: "TO"
    },
    {
        name: "Trinidad and Tobago",
        locode: "TT"
    },
    {
        name: "Tunisia",
        locode: "TN"
    },
    {
        name: "Turkey",
        locode: "TR"
    },
    {
        name: "Turkmenistan",
        locode: "TM"
    },
    {
        name: "Turks and Caicos Islands",
        locode: "TC"
    },
    {
        name: "Tuvalu",
        locode: "TV"
    },
    {
        name: "U.S. Virgin Islands",
        locode: "VI"
    },
    {
        name: "Uganda",
        locode: "UG"
    },
    {
        name: "Ukraine",
        locode: "UA"
    },
    {
        name: "United Arab Emirates",
        locode: "AE"
    },
    {
        name: "United Kingdom",
        locode: "GB"
    },
    {
        name: "United States",
        locode: "US"
    },
    {
        name: "Uruguay",
        locode: "UY"
    },
    {
        name: "Uzbekistan",
        locode: "UZ"
    },
    {
        name: "Vanuatu",
        locode: "VU"
    },
    {
        name: "Vatican",
        locode: "VA"
    },
    {
        name: "Venezuela",
        locode: "VE"
    },
    {
        name: "Viet Nam",
        locode: "VN"
    },
    {
        name: "Wallis and Futuna",
        locode: "WF"
    },
    {
        name: "Western Sahara",
        locode: "EH"
    },
    {
        name: "Yemen",
        locode: "YE"
    },
    {
        name: "Zambia",
        locode: "ZM"
    },
    {
        name: "Zimbabwe",
        locode: "ZW"
    }
];

