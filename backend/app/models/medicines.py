"""
Medicine ordering and pharmacy models
"""

from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, Float, ForeignKey, JSON, Enum
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
import enum

from app.core.database import Base

class MedicineType(str, enum.Enum):
    TABLET = "tablet"
    CAPSULE = "capsule"
    SYRUP = "syrup"
    INJECTION = "injection"
    CREAM = "cream"
    DROPS = "drops"
    INHALER = "inhaler"
    OINTMENT = "ointment"

class MedicineCategory(str, enum.Enum):
    PRESCRIPTION = "Prescription Medicines"
    OTC = "Over the Counter"
    AYURVEDIC = "Ayurvedic"
    HOMEOPATHIC = "Homeopathic"
    VITAMINS = "Vitamins & Supplements"
    BABY_CARE = "Baby Care"
    PERSONAL_CARE = "Personal Care"
    HEALTH_DEVICES = "Health Devices"
    FIRST_AID = "First Aid"

class OrderStatus(str, enum.Enum):
    PLACED = "placed"
    CONFIRMED = "confirmed"
    PACKED = "packed"
    SHIPPED = "shipped"
    DELIVERED = "delivered"
    CANCELLED = "cancelled"
    RETURNED = "returned"

class Medicine(Base):
    __tablename__ = "medicines"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False, index=True)
    generic_name = Column(String(255), nullable=False, index=True)
    brand = Column(String(255), nullable=False)
    manufacturer = Column(String(255), nullable=False)
    
    # Classification
    category = Column(Enum(MedicineCategory), nullable=False)
    medicine_type = Column(Enum(MedicineType), nullable=False)
    strength = Column(String(100), nullable=False)
    pack_size = Column(String(100), nullable=False)
    
    # Pricing
    price = Column(Float, nullable=False)
    mrp = Column(Float, nullable=False)
    discount_percentage = Column(Float, default=0)
    
    # Prescription Requirements
    prescription_required = Column(Boolean, default=False)
    
    # Stock Information
    in_stock = Column(Boolean, default=True)
    stock_quantity = Column(Integer, default=0)
    low_stock_threshold = Column(Integer, default=10)
    
    # Medicine Information
    description = Column(Text)
    uses = Column(JSON)  # List of uses
    side_effects = Column(JSON)  # List of side effects
    contraindications = Column(JSON)  # List of contraindications
    drug_interactions = Column(JSON)  # List of drug interactions
    dosage_instructions = Column(Text)
    storage_instructions = Column(Text)
    
    # Additional Information
    composition = Column(Text)
    how_it_works = Column(Text)
    precautions = Column(Text)
    
    # Images and Media
    image_url = Column(String(500))
    additional_images = Column(JSON)  # List of additional image URLs
    
    # Ratings and Reviews
    average_rating = Column(Float, default=0)
    total_reviews = Column(Integer, default=0)
    total_orders = Column(Integer, default=0)
    
    # Delivery Information
    fast_delivery_available = Column(Boolean, default=False)
    delivery_time = Column(String(100))  # "Same day", "Next day", etc.
    
    # Status
    is_active = Column(Boolean, default=True)
    is_featured = Column(Boolean, default=False)
    
    # Regulatory Information
    drug_license_number = Column(String(100))
    batch_number = Column(String(100))
    expiry_date = Column(DateTime(timezone=True))
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    order_items = relationship("MedicineOrderItem", back_populates="medicine")
    cart_items = relationship("CartItem", back_populates="medicine")

class MedicineOrder(Base):
    __tablename__ = "medicine_orders"
    
    id = Column(Integer, primary_key=True, index=True)
    order_number = Column(String(50), unique=True, nullable=False, index=True)
    
    # Customer Information
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # Prescription Information
    prescription_id = Column(Integer, ForeignKey("prescriptions.id"))
    prescription_uploaded = Column(Boolean, default=False)
    prescription_file_url = Column(String(500))
    
    # Delivery Address
    delivery_name = Column(String(255), nullable=False)
    delivery_phone = Column(String(20), nullable=False)
    delivery_email = Column(String(255))
    delivery_address_line1 = Column(String(255), nullable=False)
    delivery_address_line2 = Column(String(255))
    delivery_city = Column(String(100), nullable=False)
    delivery_state = Column(String(100), nullable=False)
    delivery_pincode = Column(String(10), nullable=False)
    delivery_landmark = Column(String(255))
    
    # Order Totals
    subtotal = Column(Float, nullable=False)
    discount_amount = Column(Float, default=0)
    delivery_charges = Column(Float, default=0)
    tax_amount = Column(Float, default=0)
    total_amount = Column(Float, nullable=False)
    
    # Payment Information
    payment_method = Column(String(50), nullable=False)
    payment_status = Column(String(20), default="pending")
    payment_id = Column(String(100))
    
    # Order Status
    order_status = Column(Enum(OrderStatus), default=OrderStatus.PLACED)
    
    # Delivery Information
    estimated_delivery_date = Column(DateTime(timezone=True))
    actual_delivery_date = Column(DateTime(timezone=True))
    tracking_number = Column(String(100))
    delivery_partner = Column(String(100))
    
    # Special Instructions
    special_instructions = Column(Text)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    confirmed_at = Column(DateTime(timezone=True))
    shipped_at = Column(DateTime(timezone=True))
    delivered_at = Column(DateTime(timezone=True))
    
    # Relationships
    user = relationship("User", back_populates="medicine_orders")
    prescription = relationship("Prescription")
    order_items = relationship("MedicineOrderItem", back_populates="order")

class MedicineOrderItem(Base):
    __tablename__ = "medicine_order_items"
    
    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("medicine_orders.id"), nullable=False)
    medicine_id = Column(Integer, ForeignKey("medicines.id"), nullable=False)
    
    # Item Details
    quantity = Column(Integer, nullable=False)
    unit_price = Column(Float, nullable=False)
    total_price = Column(Float, nullable=False)
    discount_amount = Column(Float, default=0)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    order = relationship("MedicineOrder", back_populates="order_items")
    medicine = relationship("Medicine", back_populates="order_items")

class CartItem(Base):
    __tablename__ = "cart_items"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    medicine_id = Column(Integer, ForeignKey("medicines.id"), nullable=False)
    
    # Cart Details
    quantity = Column(Integer, nullable=False, default=1)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    user = relationship("User")
    medicine = relationship("Medicine", back_populates="cart_items")

class MedicineReview(Base):
    __tablename__ = "medicine_reviews"
    
    id = Column(Integer, primary_key=True, index=True)
    medicine_id = Column(Integer, ForeignKey("medicines.id"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    order_id = Column(Integer, ForeignKey("medicine_orders.id"))
    
    # Review Details
    rating = Column(Integer, nullable=False)  # 1-5 stars
    review_title = Column(String(255))
    review_text = Column(Text)
    
    # Review Categories
    effectiveness_rating = Column(Integer)
    side_effects_rating = Column(Integer)
    value_for_money_rating = Column(Integer)
    
    # Verification
    is_verified_purchase = Column(Boolean, default=False)
    is_approved = Column(Boolean, default=False)
    
    # Helpful Votes
    helpful_votes = Column(Integer, default=0)
    total_votes = Column(Integer, default=0)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    medicine = relationship("Medicine")
    user = relationship("User")
    order = relationship("MedicineOrder")

class Pharmacy(Base):
    __tablename__ = "pharmacies"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    license_number = Column(String(100), unique=True, nullable=False)
    
    # Contact Information
    phone = Column(String(20), nullable=False)
    email = Column(String(255))
    
    # Address
    address_line1 = Column(String(255), nullable=False)
    address_line2 = Column(String(255))
    city = Column(String(100), nullable=False)
    state = Column(String(100), nullable=False)
    pincode = Column(String(10), nullable=False)
    
    # Operating Hours
    operating_hours = Column(JSON)  # Day-wise operating hours
    
    # Services
    home_delivery_available = Column(Boolean, default=True)
    delivery_radius_km = Column(Float, default=10)
    minimum_order_amount = Column(Float, default=0)
    delivery_charges = Column(Float, default=0)
    
    # Status
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)
    
    # Ratings
    average_rating = Column(Float, default=0)
    total_reviews = Column(Integer, default=0)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())