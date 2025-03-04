type Notification = {
    head: string;
    description: string;
    time: number;
    status: 'read' | 'unread';
  };
  


export const tutorialData = [
    {
        key: '1',
        title: 'Manage Your Entire Production',
        description: 'Manage schedules,sets,locations,vendors,orders, and documents - all from one app.',
        image: 'https://www.adorama.com/alc/wp-content/uploads/2017/11/music-video-recording-dance-feature-825x465.jpg',
    },
    {
        key: '2',
        title: 'Easily Find and Hire Vendors',
        description: 'Request and order rentals, services, and products from trusted vendors in just a few taps',
        image: 'https://img.freepik.com/premium-photo/cameraman-shooting-video-production-camera-videographer-concert-music-festival_143683-9804.jpg',
    },
    {
        key: '3',
        title: 'Stay on Budget in Real Time',
        description: "Track real-time costs and budget changes ",
        image: 'https://www.shutterstock.com/image-photo/professional-filming-pavilion-neon-cyclorama-260nw-2389827111.jpg',
    },
    {
        key: '4',
        title: 'Approve Payments with Confidence',
        description: "Approve vendor payments and manage P-cards directly in the app,fast and secure.",
        image: 'https://www.cineviewstudios.com/wp-content/uploads/2023/02/infinity-cove-studio-near-me-jpg.webp',
    },
    {
        key: '5',
        title: 'Track Deliveries in Real-Time',
        description: "Track Deliveries as They Happen and communicate accurate drop-off locations and change requests",
        image: 'https://thumbs.dreamstime.com/z/young-marketplace-stand-vendor-giving-food-order-to-delivery-worker-working-delivering-fresh-produce-farm-female-farmer-293598425.jpg',
    },
    {
        key: '6',
        title: 'Keep Your Team Connected',
        description: "Chat with crew,vendors, and departments instantly, keeping everyone on the same page.",
        image: 'https://www.cineviewstudios.com/wp-content/uploads/2023/02/infinity-cove-studio-near-me-jpg.webp',
    },
    {
        key: '7',
        title: 'Stay Informed with Alerts',
        description: "Receive personal, production-wise and emergency notifications to keep everyone updated.",
        image: 'https://www.adorama.com/alc/wp-content/uploads/2017/11/music-video-recording-dance-feature-825x465.jpg',
    },
    {
        key: '8',
        title: 'Safety and Security Made Easy',
        description: "Access expert security personnel and safety advisors and manage incident reports seamlessly.",
        image: 'https://thumbs.dreamstime.com/b/shooting-music-video-workers-prepare-stage-three-men-red-light-center-frame-close-up-monitor-30095127.jpg',
    },
];


export const priorityOptions = [
    {
      label: 'Standard',
      value: 'standard',
      parent: 'PSN-001',
      skill: 'Basic',
      associate: 'DA-1',
    },
    {
      label: 'Express',
      value: 'express',
      parent: 'PSN-002',
      skill: 'Intermediate',
      associate: 'DA-2',
    },
    {
      label: 'Overnight',
      value: 'overnight',
      parent: 'PSN-003',
      skill: 'Advanced',
      associate: 'DA-3',
    },
  ];


  export const notifyData: Notification[] = [
    {
      head: 'Order Confirmed!',
      description: 'Your order #123456 has been successfully placed and is being processed.',
      time: 5,
      status: 'unread'
    },
    {
      head: 'Shipped!',
      description: 'Your order #123456 has been shipped. Track your shipment for real-time updates.',
      time: 15,
      status: 'unread'
    },
    {
      head: 'Out for Delivery!',
      description: 'Your package #123456 is out for delivery. Expect it to arrive today.',
      time: 30,
      status: 'read'
    },
    {
      head: 'Delivered!',
      description: 'Your package #123456 has been delivered. We hope you enjoy your purchase!',
      time: 120,
      status: 'read'
    },
    {
      head: 'Delivery Delayed',
      description: 'Your package #123456 is delayed due to weather conditions. We’ll update you soon.',
      time: 60,
      status: 'read'
    },
    {
      head: 'Pickup Reminder',
      description: 'Your package #123456 is ready for pickup at the nearest service center.',
      time: 10,
      status: 'unread'
    },
    {
      head: 'Track Your Shipment',
      description: 'Easily track your order #123456 from the “My Orders” section in the app.',
      time: 20,
      status: 'read'
    },
    {
      head: 'Special Offer!',
      description: 'Get free shipping on your next order. Use code FREESHIP at checkout!',
      time: 45,
      status: 'unread'
    },
    {
      head: 'Address Confirmation',
      description: 'Please confirm your delivery address for order #123456 to avoid delays.',
      time: 25,
      status: 'unread'
    },
    {
      head: 'Shipment Update',
      description: 'Your package #123456 has been sorted at the distribution center and is on its way.',
      time: 35,
      status: 'read'
    },
  ];
  